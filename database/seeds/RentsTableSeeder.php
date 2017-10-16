<?php

use Illuminate\Database\Seeder;

class RentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $table_monthly = [
            [
                'section'    => 1,
                'since'      => '0.01',
                'until'      => '472',
                'percentage' => '0',
                'excess'     => '0',
                'fee'        => '0',
                'type'       => 1,
            ],
            [
                'section'    => 2,
                'since'      => '472.01',
                'until'      => '895.24',
                'percentage' => '10',
                'excess'     => '472',
                'fee'        => '17.67',
                'type'       => 1,
            ],
            [
                'section'    => 3,
                'since'      => '895.25',
                'until'      => '2038.10',
                'percentage' => '20',
                'excess'     => '895.24',
                'fee'        => '60.00',
                'type'       => 1,
            ],
            [
                'section'    => 4,
                'since'      => '2038.11',
                'until'      => '999999',
                'percentage' => '30',
                'excess'     => '2038.10',
                'fee'        => '288.57',
                'type'       => 1,
            ],
        ];

        $table_biweekly = [
            [
                'section'    => 1,
                'since'      => '0.01',
                'until'      => '236',
                'percentage' => '0',
                'excess'     => '0',
                'fee'        => '0',
                'type'       => 2,
            ],
            [
                'section'    => 2,
                'since'      => '236.01',
                'until'      => '447.62',
                'percentage' => '10',
                'excess'     => '236',
                'fee'        => '8.83',
                'type'       => 2,
            ],
            [
                'section'    => 3,
                'since'      => '447.63',
                'until'      => '1019.05',
                'percentage' => '20',
                'excess'     => '447.62',
                'fee'        => '30.00',
                'type'       => 2,
            ],
            [
                'section'    => 4,
                'since'      => '1019.06',
                'until'      => '999999',
                'percentage' => '30',
                'excess'     => '1019.05',
                'fee'        => '144.28',
                'type'       => 2,
            ],
        ];

        DB::table('rents')->insert($table_monthly);
        DB::table('rents')->insert($table_biweekly);
    }
}
