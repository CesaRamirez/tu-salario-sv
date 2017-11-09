<?php

use Illuminate\Database\Seeder;

class RentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $monthly = [
          $this->rent(1, 0.01, 472, 0, 0, 0, 1),
          $this->rent(2, 472.01, 895.24, 10, 472, 17.67, 1),
          $this->rent(3, 895.25, 2938.10, 20, 895.24, 60.00, 1),
          $this->rent(4, 2038.11, 99999, 30, 2038.10, 288.57, 1),
        ];

        $biweekly = [
          $this->rent(1, 0.01, 236, 0, 0, 0, 2),
          $this->rent(2, 236.01, 447.62, 10, 236, 8.83, 2),
          $this->rent(3, 447.63, 1019.05, 20, 447.62, 30.00, 2),
          $this->rent(4, 1010.06, 99999, 30, 1019.05, 144.28, 2),
        ];

        DB::table('rents')->insert($monthly);
        DB::table('rents')->insert($biweekly);
    }

    protected function rent(
        int $section,
        float $since,
        float $until,
        float $percentage,
        float $excess,
        float $fee,
        int $type
    ): array {
        return [
          'section'    => $section,
          'since'      => $since,
          'until'      => $until,
          'percentage' => $percentage,
          'excess'     => $excess,
          'fee'        => $fee,
          'type'       => $type,
          'created_at' => now(),
          'updated_at' => now(),
        ];
    }
}
