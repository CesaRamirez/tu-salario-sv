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
                'key'   => 'AFP',
                'value' => 6.25,
            ],
            [
                'key'   => 'ISSS',
                'value' => 3.0,
            ],
            [
                'key'   => 'SALARIO_MINIMO',
                'value' => 300.00,
            ],
            [
                'key'   => 'VACACION',
                'value' => 30,
            ],
            [
                'key'   => 'DIAS_VACACION',
                'value' => 15,
            ],
        ];

        DB::table('settings')->insert($settings);
    }
}
