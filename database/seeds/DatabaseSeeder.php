<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(RentsTableSeeder::class);
        $this->call(SettingsTableSeeder::class);
        $this->call(BonusTableSeeder::class);
    }
}
