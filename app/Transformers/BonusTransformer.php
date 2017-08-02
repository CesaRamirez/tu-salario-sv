<?php

namespace App\Transformers;

use App\TuSalarioSV\Bonus;
use League\Fractal\TransformerAbstract;

class BonusTransformer extends TransformerAbstract
{
    /**
     * Rent for transformer.
     *
     * @param \App\TuSalarioSV\Rent $rent
     *
     * @return array
     */
    public function transform(Bonus $bonus): array
    {
        return [
            'id'   => $bonus->id,
            'days' => $bonus->days,
            'start'=> $bonus->start,
            'end'  => $bonus->end,
        ];
    }
}
