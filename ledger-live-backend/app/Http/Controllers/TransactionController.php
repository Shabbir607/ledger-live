<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\WalletService;
use Exception;

class TransactionController extends Controller
{
    protected $walletService;

    public function __construct(WalletService $walletService)
    {
        $this->walletService = $walletService;
    }

    public function confirm($hash)
    {
        try {
            $this->walletService->confirmTransaction($hash);
            return response()->json(['success' => true, 'message' => 'Transaction confirmed']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 400);
        }
    }

    public function cancel($hash)
    {
        try {
            $this->walletService->cancelTransaction($hash);
            return response()->json(['success' => true, 'message' => 'Transaction canceled']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 400);
        }
    }
}
