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
    public function transform(Rent $rent): array
    {
        return [
            'id'                   => $rent->id,
            'section'              => $rent->section,
            'since'                => $rent->since,
            'until'                => $rent->until,
            'percentage'           => $rent->percentage,
            'excess'               => $rent->excess,
            'fee'                  => $rent->fee,
            'type'                 => $rent->type,
            'until_for_humans'     => $rent->until_string,
            'percentage_for_humans'=> $rent->percentage_string,
            'type_for_humans'      => $rent->type_rent,
            'section_for_humans'   => $rent->section_name,
        ];
    }
}
