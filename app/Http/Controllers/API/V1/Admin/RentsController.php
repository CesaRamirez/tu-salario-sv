<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Transformers\RentTransformer;
use App\TuSalarioSV\Rent;
use Illuminate\Http\Request;

/**
 * Rents Controller.
 */
class RentsController extends Controller
{
    /**
     * [protected description].
     *
     * @var [type]
     */
    protected $rent;

    /**
     * [protected description].
     *
     * @var [type]
     */
    protected $rentTransformer;

    /**
     * [__construct description].
     *
     * @param Rent            $rent            [description]
     * @param RentTransformer $rentTransformer [description]
     */
    public function __construct(Rent $rent, RentTransformer $rentTransformer)
    {
        $this->rent            = $rent;
        $this->rentTransformer = $rentTransformer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rents = $this->rent->all();

        return fractal()->collection($rents)
                        ->transformWith($this->rentTransformer)
                        ->toArray();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     *
     * @param \App\TuSalarioSV\Rent $rent
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Rent $rent)
    {
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\TuSalarioSV\Rent $rent
     *
     * @return \Illuminate\Http\Response
     */
    public function edit(Rent $rent)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\TuSalarioSV\Rent    $rent
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Rent $rent)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\TuSalarioSV\Rent $rent
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rent $rent)
    {
    }
}
