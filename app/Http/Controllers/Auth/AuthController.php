<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\JWTAuth;

class AuthController extends Controller
{
    /**
     * $auth variable.
     *
     * @var \Tymon\JWTAuth\JWTAuth
     */
    protected $auth;

    /**
     * AuthController Constructor.
     *
     * @param \Tymon\JWTAuth\JWTAuth $auth
     */
    public function __construct(JWTAuth $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Login app.
     *
     * @param \App\Http\Requests\Auth\LoginRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = $this->auth->attempt($credentials)) {
                return response()->json([
                    'errors' => [
                        'root' => 'Could not sign you in with those details.',
                    ],
                ], 401);
            }
        } catch (JWTException $e) {
            return response()->json([
                'errors' => [
                    'root' => 'Failde',
                ],
            ], $e->getStatusCode());
        }

        return response()->json([
            'data'  => $request->user(),
            'token' => $token,
            'meta'  => [
                'token' => $token,
            ],
        ], 200);
    }

    /**
     * Logout from session and invalidate JWT Token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->auth->invalidate($this->auth->getToken());

        return response('success logout', 200);
    }

    /**
     * Return data user.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function user(Request $request)
    {
        return response()->json([
            'data' => $request->user(),
            'user' => $request->user(),
        ]);
    }
}
