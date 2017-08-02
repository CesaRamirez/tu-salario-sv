<?php

namespace App\Helpers;

use App\TuSalarioSV\Bonus;
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
     * Bonus variable.
     *
     * @var \App\TuSalarioSV\Bonus
     */
    protected $bonus;

    /**
     * Transaction helper constructor.
     *
     * @param \App\TuSalarioSV\Setting $setting
     * @param \App\TuSalarioSV\Rent    $rent
     * @param \App\TuSalarioSV\Bonus   $bonus
     */
    public function __construct(Setting $setting, Rent $rent, Bonus $bonus)
    {
        $this->setting = $setting;
        $this->rent    = $rent;
        $this->bonus   = $bonus;
    }

    /**
     * Calculate Salary.
     *
     * @param float $mount
     * @param int   $type
     *
     * @return array
     */
    public function salary(float $mount, int $type): array
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
     * Calculate Vacation.
     *
     * @param float $mount
     *
     * @return array
     */
    public function vacation(float $mount): array
    {
        $days        = ($mount / 30) * $this->setting->value('DIAS_VACACION');
        $vacation    = $this->deduction('VACACION', $days);
        $salary      = $this->sum($vacation, $days);
        $AFP         = $this->deduction('AFP', $salary);
        $ISSS        = $this->deduction('ISSS', $salary);
        $deductions  = $this->sum($AFP, $ISSS);
        $neto        = $this->substraction($salary, $deductions);
        $rent        = $this->rent->calculation($neto, 2);
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
            'vacation'    => $vacation,
        ];
    }

    /**
     * Calculate Vacation.
     *
     * @param float $mount
     * @param int   $type
     *
     * @return array
     */
    public function bonus(float $mount, int $type): array
    {
        $days       = $this->bonus->days($type);
        $bonus      = round(($mount / 30) * $days, 2);
        $limmit     = $this->setting->value('SALARIO_MINIMO') * 2;
        if ($bonus > $limmit) {
            $bonus = $bonus - $this->substraction($bonus, $limmit);
        }

        return [
            'salary' => $mount,
            'days'   => $days,
            'bonus'  => $bonus,
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
    public function deduction($key, $value): float
    {
        $percentage = $this->setting->value($key) / 100;

        return round($value * $percentage, 2);
    }

    /**
     * Sum values.
     *
     * @param $values
     *
     * @return float
     */
    public function sum(...$values): float
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
    public function substraction(...$values): float
    {
        $substraction = 0;
        foreach ($values as $value) {
            $substraction = $value - $substraction;
        }

        return abs(round($substraction, 2));
    }
}
