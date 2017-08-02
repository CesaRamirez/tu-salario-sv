<?php

use Illuminate\Database\Seeder;

class BonusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $bonus = [
            [
                'days'  => 15,
                'start' => 1,
                'end'   => 3,
            ],
            [
                'days'  => 19,
                'start' => 3,
                'end'   => 10,
            ],
            [
                'days'  => 21,
                'start' => 10,
                'end'   => 99,
            ],
        ];

        DB::table('bonuses')->insert($bonus);
    }
}
