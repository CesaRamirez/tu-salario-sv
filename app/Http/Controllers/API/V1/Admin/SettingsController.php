<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SettingsRequest;
use App\Http\Resources\SettingResource;
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
     * SettingsController constructor.
     *
     * @param \App\TuSalarioSV\Setting $setting
     */
    public function __construct(Setting $setting)
    {
        $this->setting            = $setting;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $settings = $this->setting->all();

        return SettingResource::collection($settings);
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
            return new SettingResource($setting);
        }

        return response()->json(['error' => 'Could not save'], 422);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\TuSalarioSV\Setting $setting
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Setting $setting)
    {
        return new SettingResource($setting);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\Admin\SettingsRequest $request
     * @param \App\TuSalarioSV\Setting                 $setting
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(SettingsRequest $request, Setting $setting)
    {
        $setting->fill($request->all());

        if ($setting->save()) {
            return new SettingResource($setting);
        }

        return response()->json(['error' => 'Could not update'], 422);
    }
}
