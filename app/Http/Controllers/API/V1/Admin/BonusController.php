<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Bonus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BonusRequest;
use App\Http\Resources\BonusResource;
use Illuminate\Http\JsonResponse;

class BonusController extends Controller
{
    /**
     * bonus variable.
     *
     * @var \App\Bonus
     */
    protected $bonus;

    public function __construct(Bonus $bonus)
    {
        $this->bonus = $bonus;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $bonus = $this->bonus->all();

        return BonusResource::collection($bonus);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\Admin\BonusRequest $request
     * @param \App\Bonus                            $bonus
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(BonusRequest $request, Bonus $bonus)
    {
        $bonus->fill($request->all());

        if ($bonus->save()) {
            return new BonusResource($bonus);
        }

        return response()->json(['error' => 'Could not update'], 422);
    }

    /**
     * Show Detail Bonus.
     *
     * @param \App\Bonus $bonus
     *
     * @return JsonResponse
     */
    public function show(Bonus $bonus)
    {
        return new BonusResource($bonus);
    }
}
