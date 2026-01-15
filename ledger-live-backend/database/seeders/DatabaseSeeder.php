<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin User
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        // Regular User
        User::create([
            'name' => 'Demo User',
            'email' => 'demo@example.com',
            'password' => bcrypt('password'),
            'role' => 'user',
        ]);
        
        // Ensure wallet creation hook runs (it's in User model booted or Controller)
        // Since we are using User::create, we should rely on the User Observer or model event if it exists.
        // I recall I put the wallet creation logic in AuthController 'register' method, NOT in a model observer.
        // So for the seeder, I need to manually create wallets.
        
        $users = User::all();
        $walletService = new \App\Services\WalletService();
        $assets = ['BTC', 'ETH', 'USDT', 'BNB', 'SOL', 'ADA'];
        
        foreach ($users as $user) {
            foreach ($assets as $asset) {
                // Check if wallet exists first to avoid duplicates
                if (!$user->wallets()->where('wallet_type', $asset)->exists()) {
                     $walletService->createWallet($user, $asset, "$asset Wallet");
                }
                
                // Fund the wallet to have initial history
                // We use receiveFunds which creates a 'confirmed' credit transaction
                try {
                    $walletService->receiveFunds($user, rand(100, 10000) / 100, $asset, 'Initial Deposit');
                } catch (\Exception $e) {
                    // Ignore if fails (e.g. valid checks)
                }
            }
        }

        // Create some transfers between users
        // Admin sends to Demo
        $admin = User::where('email', 'admin@example.com')->first();
        $demo = User::where('email', 'demo@example.com')->first();
        
        if ($admin && $demo) {
            try {
                // Admin sends BTC to Demo
                $demoBtc = $demo->wallets()->where('wallet_type', 'BTC')->first();
                if ($demoBtc) {
                    $walletService->sendFunds($admin, $demoBtc->wallet_address, 0.001, 'BTC', 'Class Material Payment');
                }
                
                // Demo sends ETH to Admin
                $adminEth = $admin->wallets()->where('wallet_type', 'ETH')->first();
                if ($adminEth) {
                    $walletService->sendFunds($demo, $adminEth->wallet_address, 0.5, 'ETH', 'Project Fee');
                }
            } catch (\Exception $e) {
                // Ignore
            }
            
            // Create historical transactions for chart (backdated)
            // This simulates activity over the past year for realistic charts
            $this->createHistoricalTransactions($admin, $walletService);
            $this->createHistoricalTransactions($demo, $walletService);
        }
    }
    
    private function createHistoricalTransactions($user, $walletService)
    {
        // Create transactions at various points in the past
        $timePoints = [
            now()->subYear(),      // 1 year ago
            now()->subMonths(9),   // 9 months ago
            now()->subMonths(6),   // 6 months ago
            now()->subMonths(3),   // 3 months ago
            now()->subMonth(),     // 1 month ago
            now()->subWeeks(2),    // 2 weeks ago
            now()->subWeek(),      // 1 week ago
            now()->subDays(3),     // 3 days ago
            now()->subDay(),       // 1 day ago
            now()->subHours(12),   // 12 hours ago
            now()->subHours(6),    // 6 hours ago
        ];
        
        $assets = ['BTC', 'ETH', 'USDT', 'SOL'];
        
        foreach ($timePoints as $time) {
            foreach ($assets as $asset) {
                try {
                    $wallet = $user->wallets()->where('wallet_type', $asset)->first();
                    if (!$wallet) continue;
                    
                    // Create a transaction with backdated timestamp
                    $amount = rand(10, 500) / 100;
                    
                    $tx = \App\Models\Transaction::create([
                        'wallet_id' => $wallet->id,
                        'type' => 'credit',
                        'amount' => $amount,
                        'status' => 'confirmed',
                        'transaction_hash' => \Illuminate\Support\Str::random(64),
                        'description' => 'Historical Activity',
                        'balance_after' => $wallet->balance + $amount,
                        'created_at' => $time,
                        'updated_at' => $time,
                    ]);
                    
                    // Update wallet balance
                    $wallet->balance += $amount;
                    $wallet->save();
                    
                } catch (\Exception $e) {
                    // Continue on error
                }
            }
        }
    }
}
