<?php

namespace App\Http\Controllers\API\V1;

use App\Helpers\Transactions;
use App\Http\Controllers\Controller;
use App\Http\Requests\BonusRequest;
use App\Http\Requests\SalaryRequest;
use App\Http\Requests\VacationRequest;

class TransactionsController extends Controller
{
    /**
     * transaction variable.
     *
     * @var \App\Helpers\Transactions
     */
    protected $transaction;

    /**
     * TransactionsController Constructor.
     *
     * @param \App\Helpers\Transactions $transaction
     */
    public function __construct(Transactions $transaction)
    {
        $this->transaction = $transaction;
    }

    /**
     * Calculate Salary.
     *
     * @param \App\Http\Requests\SalaryRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function salary(SalaryRequest $request)
    {
        $salary = $this->transaction->salary($request->mount, $request->type);

        return response()->json(['data' => $salary], 200);
    }

    /**
     * Calculate Vacation.
     *
     * @param \App\Http\Requests\VacationRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function vacation(VacationRequest $request)
    {
        $vacation = $this->transaction->vacation($request->mount);

        return response()->json(['data' => $vacation], 200);
    }

    /**
     * Calculate Bonus.
     *
     * @param \App\Http\Requests\BonusRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function bonus(BonusRequest $request)
    {
        $bonus = $this->transaction->bonus($request->mount, $request->type);

        return response()->json(['data' => $bonus], 200);
    }
}
