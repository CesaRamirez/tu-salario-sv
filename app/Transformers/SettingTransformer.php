<?php

namespace App\Transformers;

use App\TuSalarioSV\Setting;
use League\Fractal\TransformerAbstract;

class SettingTransformer extends TransformerAbstract
{
    /**
     * Rent for transformer.
     *
     * @param \App\TuSalarioSV\Setting $setting
     *
     * @return array
     */
    public function transform(Setting $setting)
    {
        return [
            'id'            => $setting->id,
            'key'           => $setting->key,
            'value'         => $setting->value,
        ];
    }
}
