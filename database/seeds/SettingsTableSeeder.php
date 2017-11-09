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
          $this->setting('AFP', 'Porcentaje de AFP', 7.25),
          $this->setting('ISSS', 'Porcentaje de Seguro Social', 3.0),
          $this->setting('SALARIO_MINIMO', 'Valor de Salario Minimo', 300.00),
          $this->setting('VACACION', 'Porcentaje de pago de Vacación', 30),
          $this->setting('DIAS_VACACION', 'Dias de pago de Vacación', 15),
        ];

        DB::table('settings')->insert($settings);
    }

    /**
     * Set setting for seeder.
     *
     * @param string $key
     * @param string $description
     * @param float  $value
     *
     * @return array
     */
    protected function setting(
        string $key,
        string $description,
        float $value
    ): array {
        return [
              'key'         => $key,
              'description' => $description,
              'value'       => $value,
              'created_at'  => now(),
              'updated_at'  => now(),
        ];
    }
}
