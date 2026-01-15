<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'wallet_id',
        'type',
        'amount',
        'status',
        'transaction_hash',
        'description',
        'balance_after'
    ];
    
    protected $casts = [
        'amount' => 'decimal:8',
        'balance_after' => 'decimal:8'
    ];
    
    public function wallet()
    {
        return $this->belongsTo(Wallet::class);
    }
}
