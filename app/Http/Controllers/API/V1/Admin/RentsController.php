<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RentsRequest;
use App\Transformers\RentTransformer;
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
     * rent transformer variable.
     *
     * @var \App\Transformers\RentTransformer
     */
    protected $rentTransformer;

    /**
     * RentsController Constructor.
     *
     * @param \App\TuSalarioSV\Rent             $rent
     * @param \App\Transformers\RentTransformer $rentTransformer
     */
    public function __construct(Rent $rent, RentTransformer $rentTransformer)
    {
        $this->rent            = $rent;
        $this->rentTransformer = $rentTransformer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $rents = $this->rent->all();

        return fractal()->collection($rents)
                        ->transformWith($this->rentTransformer)
                        ->toArray();
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
        return fractal()->item($rent)
                        ->transformWith($this->rentTransformer)
                        ->toArray();
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
            return fractal()->item($rent)
                            ->transformWith($this->rentTransformer)
                            ->toArray();
        }

        return response()->json(['error' => 'Could not update'], 422);
    }
}
