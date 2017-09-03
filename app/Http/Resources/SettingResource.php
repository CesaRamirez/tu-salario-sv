<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class SettingResource extends Resource
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
            'id'          => $this->id,
            'key'         => $this->key,
            'description' => $this->description,
            'value'       => $this->value,
        ];
    }
}
