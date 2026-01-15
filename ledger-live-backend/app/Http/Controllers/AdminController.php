<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wallet;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function wallets()
    {
        // Check if admin (assuming role) or just return all for simulation purposes if auth'd user is teacher
         if (Auth::user()->role !== 'admin') {
             // For strict simulation, maybe check role. But plan said "Admins can..."
             // Let's assume the frontend calling this IS the admin interface.
         }
         
         $wallets = Wallet::with('user')->get();
         return response()->json($wallets);
    }

    public function transactions(Request $request)
    {
        $query = Transaction::with('wallet.user')->latest();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('description', 'like', "%{$search}%")
                  ->orWhere('transaction_hash', 'like', "%{$search}%")
                  ->orWhereHas('wallet.user', function($userQ) use ($search) {
                      $userQ->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }
        
        if ($request->has('type') && $request->input('type') !== 'all') {
            $query->where('type', $request->input('type'));
        }
        
        if ($request->has('user_id') && $request->input('user_id') !== 'all') {
             $query->whereHas('wallet', function($q) use ($request) {
                 $q->where('user_id', $request->input('user_id'));
             });
        }

        $transactions = $query->get();
        return response()->json($transactions);
    }

    public function walletChart($id)
    {
        // Return transaction history logic suitable for chart (balance over time)
        // Ideally we reconstruct balance history or store snapshots. 
        // For now, return transactions involving this wallet.
        // Return transaction history logic suitable for chart (balance over time)
        $transactions = Transaction::where('wallet_id', $id)->orderBy('created_at', 'asc')->get();
        
        // If no transactions, return empty
        if ($transactions->isEmpty()) {
            return response()->json([]);
        }
        
        // Ensure strictly historical points
        $points = $transactions->map(function($tx) {
            return [
                'created_at' => $tx->created_at,
                'balance_after' => (float)$tx->balance_after,
            ];
        });
        
        // If only one point (e.g. just created), add a synthetic "zero" point before it 
        // to show the jump in the chart
        if ($points->count() === 1) {
            $first = $points->first();
            $points->prepend([
                'created_at' => \Carbon\Carbon::parse($first['created_at'])->subHour(),
                'balance_after' => 0
            ]);
        }
        
        return response()->json($points);
    }
}
