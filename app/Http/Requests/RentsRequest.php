<?php

namespace App\Http\Requests;

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
            'since'      => ['required', 'numeric'],
            'until'      => ['required', 'numeric'],
            'percentage' => ['required', 'numeric'],
            'excess'     => ['required', 'numeric'],
            'fee'        => ['required', 'numeric'],
        ];
    }
}
