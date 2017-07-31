<?php

namespace App\Transformers;

use App\TuSalarioSV\Rent;
use League\Fractal\TransformerAbstract;

class RentTransformer extends TransformerAbstract
{
    /**
     * Rent for transformer.
     *
     * @param \App\TuSalarioSV\Rent $rent
     *
     * @return array
     */
    public function transform(Rent $rent)
    {
        return [
            'id'         => $rent->id,
            'section'    => $rent->section_name,
            'since'      => $rent->since,
            'until'      => $rent->until,
            'percentage' => $rent->percentage,
            'excess'     => $rent->excess,
            'fee'        => $rent->fee,
            'type'       => $rent->type_rent,
        ];
    }
}
