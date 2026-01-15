<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Wallet;
use App\Models\Transaction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Laravel\Passport\Passport;

class WalletTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Manually create a personal access client to avoid artisan prompt issues
        $client = \Laravel\Passport\Client::create([
            'user_id' => null,
            'name' => 'Test Client',
            'secret' => 'secret',
            'provider' => 'users',
            'redirect' => 'http://localhost',
            'personal_access_client' => true,
            'password_client' => false,
            'revoked' => false,
        ]);

        \Illuminate\Support\Facades\DB::table('oauth_personal_access_clients')->insert([
            'client_id' => $client->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function test_registration_creates_user_and_wallet()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test Student',
            'email' => 'student@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['success', 'data' => ['token', 'user', 'wallets']]);

        $this->assertDatabaseHas('users', ['email' => 'student@example.com', 'role' => 'student']);
        $this->assertDatabaseHas('wallets', ['wallet_type' => 'BTC', 'balance' => 0]);
    }

    public function test_login_returns_wallet_data()
    {
        $user = User::factory()->create();
        $this->app->make(\App\Services\WalletService::class)->createWallet($user, 'BTC');

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password', // Factory default
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['success', 'data' => ['wallets']]);
    }

    public function test_send_transaction_flow()
    {
        // Setup
        $sender = User::factory()->create();
        $senderWallet = $this->app->make(\App\Services\WalletService::class)->createWallet($sender, 'BTC');
        $senderWallet->balance = 1.0;
        $senderWallet->save();

        $receiver = User::factory()->create();
        $receiverWallet = $this->app->make(\App\Services\WalletService::class)->createWallet($receiver, 'BTC');

        Passport::actingAs($sender);

        // Act: Send 0.1 BTC
        $response = $this->postJson('/api/wallet/send', [
            'amount' => 0.1,
            'to_wallet_address' => $receiverWallet->wallet_address,
            'type' => 'BTC',
            'memo' => 'Test Transaction'
        ]);

        // Assert
        $response->assertStatus(200)
                 ->assertJson(['success' => true]);

        // Check Sender Balance (Immediate deduction)
        $this->assertDatabaseHas('wallets', [
            'id' => $senderWallet->id, 
            'balance' => 0.9 // 1.0 - 0.1
        ]);

        // Check Transactions Created
        $this->assertDatabaseHas('transactions', [
            'wallet_id' => $senderWallet->id,
            'type' => 'debit',
            'amount' => 0.1,
            'status' => 'pending'
        ]);

        $this->assertDatabaseHas('transactions', [
            'wallet_id' => $receiverWallet->id,
            'type' => 'credit',
            'amount' => 0.1,
            'status' => 'pending'
        ]);
        
        // Receiver balance should NOT increase yet (pending)
        $this->assertDatabaseHas('wallets', [
            'id' => $receiverWallet->id,
            'balance' => 0
        ]);
    }

    public function test_confirm_transaction_updates_receiver_balance()
    {
        // Setup
        $sender = User::factory()->create();
        $senderWallet = $this->app->make(\App\Services\WalletService::class)->createWallet($sender, 'BTC');
        $senderWallet->balance = 1.0;
        $senderWallet->save();
        
        $receiver = User::factory()->create();
        $receiverWallet = $this->app->make(\App\Services\WalletService::class)->createWallet($receiver, 'BTC');

        Passport::actingAs($sender);

        // Create transaction
        $response = $this->postJson('/api/wallet/send', [
            'amount' => 0.1,
            'to_wallet_address' => $receiverWallet->wallet_address,
            'type' => 'BTC'
        ]);
        $hash = $response->json('transaction.transaction_hash');

        // Confirm
        $confirmResponse = $this->postJson("/api/wallet/transaction/{$hash}/confirm");
        $confirmResponse->assertStatus(200);

        // Receiver balance should now increase
        $this->assertDatabaseHas('wallets', [
            'id' => $receiverWallet->id,
            'balance' => 0.1
        ]);
        
        // Status confirmed
        $this->assertDatabaseHas('transactions', [
            'transaction_hash' => $hash,
            'status' => 'confirmed'
        ]);
    }
    
    public function test_insufficient_funds()
    {
        $user = User::factory()->create();
        $wallet = $this->app->make(\App\Services\WalletService::class)->createWallet($user, 'BTC');
        $wallet->balance = 0.05;
        $wallet->save();
        
        Passport::actingAs($user);
        
        $response = $this->postJson('/api/wallet/send', [
            'amount' => 0.1, // More than balance
            'to_wallet_address' => 'arbitrary',
            'type' => 'BTC'
        ]);
        
        $response->assertStatus(400)
                 ->assertJson(['success' => false, 'message' => 'Insufficient funds']);
    }

    public function test_localization_es()
    {
        $sender = User::factory()->create();
        $wallet = $this->app->make(\App\Services\WalletService::class)->createWallet($sender, 'BTC');
        $wallet->balance = 1.0;
        $wallet->save();
        
        // Another wallet
        $receiverWallet = $this->app->make(\App\Services\WalletService::class)->createWallet(User::factory()->create(), 'BTC');

        Passport::actingAs($sender);

        // Send with ES header
        $response = $this->postJson('/api/wallet/send', [
            'amount' => 0.1,
            'to_wallet_address' => $receiverWallet->wallet_address,
            'type' => 'BTC'
        ], ['Accept-Language' => 'es']);

        $response->assertStatus(200);
        
        // Verify the created transaction has Spanish description
        $tx = Transaction::where('wallet_id', $sender->wallets->first()->id)->latest()->first();
        // Check for Spanish text part "Has enviado"
        $this->assertStringContainsString('Has enviado', $tx->description);
    }
}
