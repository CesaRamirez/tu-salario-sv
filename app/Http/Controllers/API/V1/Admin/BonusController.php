<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BonusRequest;
use App\Transformers\BonusTransformer;
use App\TuSalarioSV\Bonus;

class BonusController extends Controller
{
    /**
     * bonus variable.
     *
     * @var \App\TuSalarioSV\Bonus
     */
    protected $bonus;

    /**
     * bonus transformer variable.
     *
     * @var \App\Transformers\BonusTransformer
     */
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
     * @return \Illuminate\Http\JsonResponse
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
     * @return \Illuminate\Http\JsonResponse
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
