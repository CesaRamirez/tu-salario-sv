<?php

use Illuminate\Database\Seeder;

class SettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $settings = [
            [
                'key'         => 'AFP',
                'description' => 'Porcentaje de AFP',
                'value'       => 6.25,
            ],
            [
                'key'         => 'ISSS',
                'description' => 'Porcentaje de Seguro Social',
                'value'       => 3.0,
            ],
            [
                'key'         => 'SALARIO_MINIMO',
                'description' => 'Valor de Salario Minimo',
                'value'       => 300.00,
            ],
            [
                'key'         => 'VACACION',
                'description' => 'Porcentaje de pago de Vacación',
                'value'       => 30,
            ],
            [
                'key'         => 'DIAS_VACACION',
                'description' => 'Dias de pago de Vacación',
                'value'       => 15,
            ],
        ];

        DB::table('settings')->insert($settings);
    }
}
