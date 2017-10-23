<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $user = [
          'name'       => 'César Ramírez',
          'email'      => 'i@ces.ar',
          'password'   => bcrypt('secret'),
          'created_at' => Carbon::now(),
          'updated_at' => Carbon::now(),
        ];

        DB::table('users')->insert($user);
    }
}
