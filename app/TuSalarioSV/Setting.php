<?php

namespace App\TuSalarioSV;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['key', 'value'];

    /**
     * Return value by key.
     *
     * @param string $key
     *
     * @return float
     */
    public function value(string $key): float
    {
        return $this->key($key)->first()->value;
    }

    /**
     * Key setting.
     *
     * @param string $key
     */
    public function key(string $key)
    {
        return $this->where('key', $key);
    }
}
