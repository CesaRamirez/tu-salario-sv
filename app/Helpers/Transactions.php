<?php

namespace App\Helpers;

use App\TuSalarioSV\Rent;
use App\TuSalarioSV\Setting;

class Transactions
{
    /**
     * Setting variable.
     *
     * @var \App\TuSalarioSV\Setting
     */
    protected $setting;

    /**
     * Rent variable.
     *
     * @var \App\TuSalarioSV\Rent
     */
    protected $rent;

    /**
     * Transaction helper constructor.
     *
     * @param \App\TuSalarioSV\Setting $setting
     * @param \App\TuSalarioSV\Rent    $rent
     */
    public function __construct(Setting $setting, Rent $rent)
    {
        $this->setting = $setting;
        $this->rent    = $rent;
    }

    /**
     * Calcualte Salary.
     *
     * @param float $mount
     * @param int   $type
     *
     * @return array
     */
    public function salary(float $mount, int $type)
    {
        $salary      = $type == 1 ? $mount : $mount / 2;
        $AFP         = $this->deduction('AFP', $salary);
        $ISSS        = $this->deduction('ISSS', $salary);
        $deductions  = $this->sum($AFP, $ISSS);
        $neto        = $this->substraction($salary, $deductions);
        $rent        = $this->rent->calculation($neto, $type);
        $neto_total  = $this->substraction($neto, $rent);

        return [
            'mount'       => floatval($mount),
            'salary'      => floatval($salary),
            'AFP'         => $AFP,
            'ISSS'        => $ISSS,
            'deductions'  => $deductions,
            'rent'        => $rent,
            'neto'        => $neto,
            'total'       => $neto_total,
        ];
    }

    /**
     * Get value deduction.
     *
     * @param string $key
     * @param float  $value
     *
     * @return float
     */
    public function deduction($key, $value)
    {
        $percentage = $this->setting->value($key);

        return round($value * $percentage, 2);
    }

    /**
     * Sum values.
     *
     * @param $values
     *
     * @return float
     */
    public function sum(...$values)
    {
        $sum = 0;
        foreach ($values as $value) {
            $sum += $value;
        }

        return round($sum, 2);
    }

    /**
     * Substract values.
     *
     * @param $values
     *
     * @return float
     */
    public function substraction(...$values)
    {
        $substraction = 0;
        foreach ($values as $value) {
            $substraction = $value - $substraction;
        }

        return abs(round($substraction, 2));
    }
}
