<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RentsRequest;
use App\Http\Resources\RentResource;
use App\TuSalarioSV\Rent;

class RentsController extends Controller
{
    /**
     * rent variable.
     *
     * @var \App\TuSalarioSV\Rent
     */
    protected $rent;

    /**
     * RentsController Constructor.
     *
     * @param \App\TuSalarioSV\Rent $rent
     */
    public function __construct(Rent $rent)
    {
        $this->rent = $rent;
    }

    /**
     * Display a listing of the resource.
     *
     * @param int $type
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($type)
    {
        $rents = $this->rent->where('type', $type)->get();

        return RentResource::collection($rents);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\TuSalarioSV\Rent $rent
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Rent $rent)
    {
        return new RentResource($rent);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\Admin\RentsRequest $request
     * @param \App\TuSalarioSV\Rent                 $rent
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(RentsRequest $request, Rent $rent)
    {
        $rent->fill($request->all());

        if ($rent->save()) {
            return new RentResource($rent);
        }

        return response()->json(['error' => 'Could not update'], 422);
    }
}
