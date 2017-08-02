<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SettingsRequest;
use App\Transformers\SettingTransformer;
use App\TuSalarioSV\Setting;

class SettingsController extends Controller
{
    /**
     * setting variable.
     *
     * @var \App\TuSalarioSV\Setting
     */
    protected $setting;

    /**
     * Setting Transformer Variable.
     *
     * @var \App\Transformers\SettingTransformer
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
     * Store a newly created resource in storage..
     *
     * @param \App\Http\Requests\Admin\SettingsRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(SettingsRequest $request)
    {
        $this->setting->fill($request->all());

        if ($this->setting->save()) {
            return fractal()->item($this->setting)
                            ->transformWith($this->settingTransformer)
                            ->toArray();
        }

        return response()->json(['error' => 'Could not save'], 422);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\TuSalarioSV\Setting $setting
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Setting $setting)
    {
        return fractal()->item($setting)
                        ->transformWith($this->settingTransformer)
                        ->toArray();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\Admin\SettingsRequest $request
     * @param \App\TuSalarioSV\Setting                 $setting
     *
     * @return \Illuminate\Http\Response
     */
    public function update(SettingsRequest $request, Setting $setting)
    {
        $setting->fill($request->all());

        if ($setting->save()) {
            return fractal()->item($setting)
                            ->transformWith($this->settingTransformer)
                            ->toArray();
        }

        return response()->json(['error' => 'Could not update'], 422);
    }
}
