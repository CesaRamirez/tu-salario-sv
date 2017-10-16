<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class RentResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     *
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'                   => $this->id,
            'section'              => $this->section,
            'since'                => $this->since,
            'until'                => $this->until,
            'percentage'           => $this->percentage,
            'excess'               => $this->excess,
            'fee'                  => $this->fee,
            'type'                 => $this->type,
            'until_for_humans'     => $this->until_string,
            'percentage_for_humans'=> $this->percentage_string,
            'type_for_humans'      => $this->type_rent,
            'section_for_humans'   => $this->section_name,
        ];
    }
}
