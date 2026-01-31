<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiController extends Controller
{
    public function login(LoginRequest $request){
        $credentials = $request->validated();
        if(!Auth::attempt($credentials)){   
            return response()->json([
                "message" => "Provided email address or password is incorrect"
                ]);
        }
    }
    public function signup(SignupRequest $request){
    $data = $request->validated();
    $user = User::create([
        "name"=> $data["name"],
        "email"=> $data["email"],
        "password"=> bcrypt($data["password"]),
        ]);
        $token = $user->createToken("main")->plainTextToken;
        return response(compact("user","token"));
        
    }
    public function logout(){

    }
}
