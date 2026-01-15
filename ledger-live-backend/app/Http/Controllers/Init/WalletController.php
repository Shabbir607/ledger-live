<?php

namespace App\Http\Controllers\Init;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\WalletService;
use Illuminate\Support\Facades\Auth;
use Exception;

class WalletController extends Controller
{
    protected $walletService;

    public function __construct(WalletService $walletService)
    {
        $this->walletService = $walletService;
    }

    public function balance()
    {
        $wallets = $this->walletService->getBalance(Auth::user());
        return response()->json([
            'success' => true,
            'wallets' => $wallets
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            'wallet_type' => 'required|string',
            'name' => 'nullable|string|max:255',
        ]);

        try {
            $wallet = $this->walletService->createWallet(
                Auth::user(), 
                $request->input('wallet_type'),
                $request->input('name')
            );
            
            // If amount is requested (e.g. from Receive.jsx default logic or seeding), handle it
            // The frontend send "amount" in create call in Receive.jsx?
            // "body: JSON.stringify({ wallet_type: walletType, amount: 0.005 }),"
            // Yes, it does. So we should credit it.
            if ($request->has('amount') && $request->input('amount') > 0) {
                 $this->walletService->receiveFunds(Auth::user(), $request->input('amount'), $request->input('wallet_type'), 'Initial Deposit');
                 $wallet->refresh(); // Refresh balance
            }
            
            // Frontend expects 'wallets' array locally? 
            // View Receive.jsx: 
            // if (result.success && result.wallets) { setAllWallets(result.wallets); ... }
            // So we need to return ALL wallets.
            $wallets = $this->walletService->getBalance(Auth::user());

            return response()->json([
                'success' => true,
                'wallets' => $wallets,
                'message' => 'Wallet created successfully'
            ]);

        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 400);
        }
    }

    public function send(Request $request)
    {
         $request->validate([
            'amount' => 'required|numeric|min:0.00000001',
            'to_wallet_address' => 'required|string',
            'type' => 'required|string',
        ]);

        try {
            $tx = $this->walletService->sendFunds(
                Auth::user(),
                $request->input('to_wallet_address'),
                $request->input('amount'),
                $request->input('type'),
                $request->input('memo')
            );
            
             return response()->json([
                'success' => true,
                'transaction' => $tx,
                'message' => 'Transaction sent successfully'
            ]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 400);
        }
    }
    
    public function receive(Request $request) 
    {
        $request->validate([
            'amount' => 'required|numeric|min:0',
            'type' => 'required|string',
            'source' => 'string'
        ]);
        
        try {
             $tx = $this->walletService->receiveFunds(
                Auth::user(),
                $request->input('amount'),
                $request->input('type'),
                $request->input('source', 'System')
             );
             
             return response()->json(['success' => true, 'transaction' => $tx]);
        } catch (Exception $e) {
             return response()->json(['success' => false, 'message' => $e->getMessage()], 400);
        }
    }
    public function swap(Request $request) 
    {
        $request->validate([
            'from' => 'required',
            'to' => 'required|different:from',
            'amount' => 'required|numeric|min:0.000001',
        ]);
        
        try {
            $result = $this->walletService->swapFunds(
                Auth::user(),
                $request->from,
                $request->to,
                $request->amount
            );
            return response()->json(['success' => true, 'data' => $result]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 400);
        }
    }
    
    public function stake(Request $request)
    {
        $request->validate([
            'wallet_type' => 'required|string',
            'amount' => 'required|numeric|min:0.000001',
            'duration' => 'required|integer|in:30,90,180,365',
        ]);
        
        try {
            $result = $this->walletService->stakeFunds(
                Auth::user(),
                $request->wallet_type,
                $request->amount,
                $request->duration
            );
            return response()->json(['success' => true, 'data' => $result]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 400);
        }
    }
}
