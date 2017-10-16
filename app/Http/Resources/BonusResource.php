<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class BonusResource extends Resource
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
            'id'   => $this->id,
            'days' => $this->days,
            'start'=> $this->start,
            'end'  => $this->end,
        ];
    }
}
