<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    private $authService;
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(Request $request){
        $data = $request->all();

        $validator = Validator::make($data,[
            'email'   => 'required|email|exists:users,email',
            'password' => 'required|min:6'
        ],[
            'email.exists' => "Invalid Creadentials.",
        ]);

        if($validator->fails()){
            return response()->json([
                'messages' => collect($validator->errors()->all())
            ], 422);
        }

        return $this->authService->login($data);
    }

    public function logout(){
         Auth::logout();
         return response()->json(['message' => 'Logout Successfully !'], 200);
    }
    public function authUser(){
        return Auth::user();
    }

}
