<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Services\WalletService;
use Exception;

class AuthController extends Controller
{
    protected $walletService;

    public function __construct(WalletService $walletService)
    {
        $this->walletService = $walletService;
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        try {
            $role = $request->role === 'admin' ? 'admin' : 'student'; // Map 'user' or others to 'student'
            
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password), // Keep original Hash::make
                'role' => $role,
            ]);

            // Create default wallets for the new user
            $defaultCoins = ['BTC', 'ETH', 'USDT', 'BNB', 'SOL', 'ADA'];
            foreach ($defaultCoins as $coin) {
                \App\Models\Wallet::create([
                    'user_id' => $user->id,
                    'wallet_type' => $coin,
                    'wallet_address' => Str::uuid(), // Generate a unique address
                    'balance' => 0,
                    'balance_usd' => 0,
                ]);
            }

            // Revert to original token creation and response structure
            $token = $user->createToken('auth_token')->accessToken;
            $wallets = $this->walletService->getBalance($user);

            return response()->json([
                'success' => true,
                'data' => [
                    'user' => $user,
                    'token' => $token,
                    'wallets' => $wallets // Return wallet data as requested
                ],
                'message' => 'User registered successfully'
            ]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 400);
        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid login details',
                'code' => 'INVALID_CREDENTIALS' // Matches frontend style
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->accessToken;
        $wallets = $this->walletService->getBalance($user);

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
                'token' => $token,
                'wallets' => $wallets
            ],
            'meta' => [
                'explanation' => __('auth.success_login') // Localized explanation placeholder
            ]
        ]);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:6|confirmed', // expects new_password_confirmation
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
             return response()->json(['message' => 'Current password does not match'], 400);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password changed successfully']);
    }
}
