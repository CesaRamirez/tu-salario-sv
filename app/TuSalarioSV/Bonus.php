<?php

namespace App\TuSalarioSV;

use Illuminate\Database\Eloquent\Model;

class Bonus extends Model
{
    protected $fillable = ['days', 'start', 'end'];

    public function days($id)
    {
        return $this->find($id)->first()->days;
    }
}
