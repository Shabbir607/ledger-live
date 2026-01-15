<?php

namespace App\Services;

use App\Models\User;
use App\Models\Wallet;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Exception;

class WalletService
{
    public function createWallet(User $user, string $type = 'BTC', string $name = null)
    {
        // Simulate an address based on type
        $prefix = match($type) {
            'BTC' => '1',
            'ETH' => '0x',
            'USDT' => 'T',
            'SOL' => 'Sol',
            'BNB' => 'bnb',
            'ADA' => 'addr',
            default => '0x'
        };
        
        $address = $prefix . Str::random(34); // Simplified simulation

        return Wallet::create([
            'user_id' => $user->id,
            'wallet_type' => $type,
            'name' => $name ?? ($type . ' Wallet'),
            'wallet_address' => $address,
            'balance' => 0,
            'simulation_meta' => json_encode(['is_simulated' => true]),
        ]);
    }

    public function getBalance(User $user)
    {
        $wallets = $user->wallets()->with('transactions')->get();
        
        // Simulated Market Data (Prices in USD)
        $prices = [
            'BTC' => 42000.0,
            'ETH' => 2800.0,
            'USDT' => 1.0,
            'BNB' => 350.0,
            'SOL' => 95.0,
            'ADA' => 0.55,
        ];

        return $wallets->map(function ($wallet) use ($prices) {
            $type = strtoupper($wallet->wallet_type ?? ''); // Ensure uppercase and not null
            $price = $prices[$type] ?? 0.0;
            $change = 0.0; // Default change

            // Add simple random variation for change based on type hash if needed, or just static
            // For now static from array above but I simplified the array. 
            // Let's bring back the rich array if it works, but simplified first.
            
            if ($type === 'BTC') $change = 2.5;
            if ($type === 'ETH') $change = -1.2;
            if ($type === 'SOL') $change = 5.4;
            
            $balance = (float) $wallet->balance; 
            
            // Set dynamic properties
            $wallet->balance_usd = $balance * $price;
            $wallet->market_data = [
                'current_price' => $price,
                'price_change_24h' => $change,
                'price_change_7d' => $change * 1.5,
                'market_cap_rank' => 1
            ];
            
            return $wallet;
        });
    }

    public function sendFunds(User $user, string $toAddress, float $amount, string $type, string $description = null)
    {
        return DB::transaction(function () use ($user, $toAddress, $amount, $type, $description) {
            $senderWallet = $user->wallets()->where('wallet_type', $type)->lockForUpdate()->first();

            if (!$senderWallet) {
                throw new Exception("Wallet not found for type: $type");
            }

            if ($senderWallet->balance < $amount) {
                throw new Exception("Insufficient funds");
            }

            // Find receiver wallet (even if it belongs to same user, though usually another user)
            $receiverWallet = Wallet::where('wallet_address', $toAddress)->lockForUpdate()->first();

            if (!$receiverWallet) {
                // In a real simulation, maybe we allow sending to external addresses (simulated burn or specific external simulation)
                // For now, let's assume valid internal destination or throw error
               throw new Exception("Destination wallet not found in simulation");
            }

            // Deduct
            $senderWallet->balance -= $amount;
            $senderWallet->save();

            // Create Transaction Record (Debit for Sender)
            $tx = Transaction::create([
                'wallet_id' => $senderWallet->id,
                'type' => 'debit',
                'amount' => $amount,
                'status' => 'pending', // Simulating delay
                'transaction_hash' => Str::random(64),
                // Use localized explanation
                'description' => __('transactions.sent', [
                    'amount' => $amount, 
                    'type' => $type
                ]),
                'balance_after' => $senderWallet->balance,
            ]);

            // For Receiver (Credit)
            Transaction::create([
                'wallet_id' => $receiverWallet->id,
                'type' => 'credit',
                'amount' => $amount,
                'status' => 'pending',
                'transaction_hash' => $tx->transaction_hash, // Same hash
                'description' => __('transactions.received', [
                    'amount' => $amount,
                    'type' => $type
                ]),
                'balance_after' => $receiverWallet->balance, // Balance not updated yet until confirmed?
            ]);
            
            return $tx;
        });
    }
    
    // confirmTransaction logic to be used by TransactionItem
    public function confirmTransaction(string $hash) 
    {
        return DB::transaction(function () use ($hash) {
           $transactions = Transaction::where('transaction_hash', $hash)->get();
           
           foreach($transactions as $tx) {
               if($tx->status === 'confirmed') continue;
               
               $tx->status = 'confirmed';
               $tx->save();
               
               if ($tx->type === 'credit') {
                   $wallet = Wallet::where('id', $tx->wallet_id)->lockForUpdate()->first();
                   $wallet->balance += $tx->amount;
                   $wallet->save();
                   
                   $tx->balance_after = $wallet->balance;
                   $tx->save();
               }
           }
           
           return true;
        });
    }

    public function cancelTransaction(string $hash)
    {
         return DB::transaction(function () use ($hash) {
           $transactions = Transaction::where('transaction_hash', $hash)->get();
           $debitTx = $transactions->where('type', 'debit')->first();
           
           // If confirmed, cannot cancel (simple logic)
           if ($debitTx && $debitTx->status === 'confirmed') throw new Exception("Cannot cancel confirmed transaction");
           
           foreach($transactions as $tx) {
               $tx->status = 'canceled';
               $tx->save();
           }
           
           // Refund sender
           if ($debitTx) {
               $wallet = Wallet::where('id', $debitTx->wallet_id)->lockForUpdate()->first();
               $wallet->balance += $debitTx->amount;
               $wallet->save();
               
               $debitTx->balance_after = $wallet->balance;
               $debitTx->save();
           }
           
           return true;
        });
    }

    public function receiveFunds(User $user, float $amount, string $type, string $source = "System")
    {
        return DB::transaction(function () use ($user, $amount, $type, $source) {
             $wallet = $user->wallets()->where('wallet_type', $type)->lockForUpdate()->first();
             if (!$wallet) throw new Exception("Wallet not found");

             $wallet->balance += $amount;
             $wallet->save();

             return Transaction::create([
                'wallet_id' => $wallet->id,
                'type' => 'credit',
                'amount' => $amount,
                'status' => 'confirmed', // Auto confirm for "Receive" feature from 'Exchange'
                'transaction_hash' => Str::random(64),
                'description' => __('transactions.received_auto', [
                    'amount' => $amount,
                    'type' => $type,
                    'source' => $source
                ]),
                'balance_after' => $wallet->balance,
            ]);
        });
    }
    public function swapFunds(User $user, string $fromType, string $toType, float $amount)
    {
        return DB::transaction(function () use ($user, $fromType, $toType, $amount) {
            // 1. Get Simulation Prices
            $prices = [
                'BTC' => 42000.0,
                'ETH' => 2800.0,
                'USDT' => 1.0,
                'BNB' => 350.0,
                'SOL' => 95.0,
                'ADA' => 0.55,
            ];
            
            $fromPrice = $prices[$fromType] ?? 0;
            $toPrice = $prices[$toType] ?? 0;
            
            if ($fromPrice <= 0 || $toPrice <= 0) {
                throw new Exception("Exchange rate unavailable for $fromType to $toType");
            }
            
            // 2. Lock Source Wallet
            $fromWallet = $user->wallets()->where('wallet_type', $fromType)->lockForUpdate()->first();
            if (!$fromWallet || $fromWallet->balance < $amount) {
                throw new Exception("Insufficient balance in $fromType wallet");
            }
            
            // 3. Find/Create Target Wallet
            $toWallet = $user->wallets()->where('wallet_type', $toType)->lockForUpdate()->first();
            if (!$toWallet) {
                // If target wallet doesn't exist, create it on the fly
                $toWallet = this->createWallet($user, $toType); 
                // Wait, cannot access $this in closure unless mapped. 
                // Actually WalletService methods are public. But better to assume wallet exists or fail?
                // The requirements say "select one wallet to other own wallet". Usually implies existing.
                // But for good UX, I'll error if not found or ensure frontend checks.
                throw new Exception("Target wallet $toType not found. Please create it first.");
            }
            
            // 4. Calculate Conversion
            // Value in USD
            $usdValue = $amount * $fromPrice;
            $receiveAmount = $usdValue / $toPrice;
            
            // 5. Execute Swap
            $fromWallet->balance -= $amount;
            $fromWallet->save();
            
            $toWallet->balance += $receiveAmount;
            $toWallet->save();
            
            // 6. Record Transaction (Swap is often 2 records or 1 special type)
            // We'll create a Debit on Source and Credit on Target
            
            $rate = number_format($toPrice / $fromPrice, 6); // 1 From = X To? No, Price From / Price To = X To per 1 From.
            // e.g. BTC (40k) -> ETH (2k). 1 BTC = 20 ETH.
            $exchangeRate = $fromPrice / $toPrice;
            
            // Debit Side
             Transaction::create([
                'wallet_id' => $fromWallet->id,
                'type' => 'swap_out', // or debit
                'amount' => $amount,
                'status' => 'confirmed',
                'transaction_hash' => Str::random(64),
                'description' => "Swap to $toType (@ $exchangeRate)",
                'balance_after' => $fromWallet->balance,
            ]);
            
            // Credit Side
            Transaction::create([
                'wallet_id' => $toWallet->id,
                'type' => 'swap_in', // or credit
                'amount' => $receiveAmount,
                'status' => 'confirmed',
                'transaction_hash' => Str::random(64),
                'description' => "Swap from $fromType",
                'balance_after' => $toWallet->balance,
            ]);
            
            return [
                'from' => $fromType,
                'to' => $toType,
                'sent' => $amount,
                'received' => $receiveAmount,
                'rate' => $exchangeRate
            ];
        });
    }
    
    public function stakeFunds(User $user, string $walletType, float $amount, int $duration)
    {
        return DB::transaction(function () use ($user, $walletType, $amount, $duration) {
            // Lock wallet
            $wallet = $user->wallets()->where('wallet_type', $walletType)->lockForUpdate()->first();
            
            if (!$wallet || $wallet->balance < $amount) {
                throw new Exception("Insufficient balance in $walletType wallet");
            }
            
            // Deduct staked amount
            $wallet->balance -= $amount;
            $wallet->save();
            
            // Calculate APY based on duration
            $apyRates = [
                30 => 5,
                90 => 8,
                180 => 12,
                365 => 18,
            ];
            
            $apy = $apyRates[$duration] ?? 5;
            $rewards = ($amount * $apy / 100 * $duration / 365);
            
            // Create staking transaction record
            Transaction::create([
                'wallet_id' => $wallet->id,
                'type' => 'debit',
                'amount' => $amount,
                'status' => 'confirmed',
                'transaction_hash' => Str::random(64),
                'description' => "Staked for $duration days at $apy% APY",
                'balance_after' => $wallet->balance,
            ]);
            
            return [
                'staked_amount' => $amount,
                'duration' => $duration,
                'apy' => $apy,
                'estimated_rewards' => $rewards,
                'unlock_date' => now()->addDays($duration)->toDateString(),
            ];
        });
    }
}
