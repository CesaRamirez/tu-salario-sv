<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Transformers\SettingTransformer;
use App\TuSalarioSV\Setting;
use App\TuSalarioSV\Settings;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    /**
     * [protected description].
     *
     * @var [type]
     */
    protected $setting;

    /**
     * [protected description].
     *
     * @var [type]
     */
    protected $settingTransformer;

    /**
     * SettingsController constructor.
     *
     * @param \App\TuSalarioSV\Setting             $setting
     * @param \App\Transformers\SettingTransformer $settingTransformer
     */
    public function __construct(
        Setting $setting,
        SettingTransformer $settingTransformer)
    {
        $this->setting            = $setting;
        $this->settingTransformer = $settingTransformer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $settings = $this->setting->all();

        return fractal()->collection($settings)
                        ->transformWith($this->settingTransformer)
                        ->toArray();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     *
     * @param \App\TuSalarioSV\Settings $settings
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Settings $settings)
    {
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\TuSalarioSV\Settings $settings
     *
     * @return \Illuminate\Http\Response
     */
    public function edit(Settings $settings)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request  $request
     * @param \App\TuSalarioSV\Settings $settings
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Settings $settings)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\TuSalarioSV\Settings $settings
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Settings $settings)
    {
    }
}
