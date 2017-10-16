<?php

namespace App\Http\Requests\Admin;

use App\Http\Requests\FormRequest;

class RentsRequest extends FormRequest
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
            'since'      => ['required', 'numeric', 'min:0'],
            'until'      => ['required', 'numeric', 'min:'.$this->since],
            'percentage' => ['required', 'numeric'],
            'excess'     => ['required', 'numeric'],
            'fee'        => ['required', 'numeric'],
        ];
    }
}
