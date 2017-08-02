<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BonusRequest;
use App\Transformers\BonusTransformer;
use App\TuSalarioSV\Bonus;

class BonusController extends Controller
{
    protected $bonus;
    protected $bonusTransformer;

    public function __construct(
        Bonus $bonus,
        BonusTransformer $bonusTransformer
        ) {
        $this->bonus            = $bonus;
        $this->bonusTransformer = $bonusTransformer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $bonus = $this->bonus->all();

        return fractal()->collection($bonus)
                        ->transformWith($this->bonusTransformer)
                        ->toArray();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\Admin\BonusRequest $request
     * @param \App\TuSalarioSV\Bonus                $bonus
     *
     * @return \Illuminate\Http\Response
     */
    public function update(BonusRequest $request, Bonus $bonus)
    {
        $bonus->fill($request->all());

        if ($bonus->save()) {
            return fractal()->item($bonus)
                            ->transformWith($this->bonusTransformer)
                            ->toArray();
        }

        return response()->json(['error' => 'Could not update'], 422);
    }
}
