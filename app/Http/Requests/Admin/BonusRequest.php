<?php

namespace App\Http\Requests\Admin;

use App\Http\Requests\FormRequest;

class BonusRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'days'  => 'required',
            'start' => 'required',
            'end'   => 'required',
        ];
    }
}
