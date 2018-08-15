<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HotelsBotsController extends Controller
{
    //
    public function webserviceBots(){
        $config = array(
            'conector_secret' => env('KAIZALA_CONNECTOR_SECRET'),
            'connector_id' => env('KAIZALA_CONNECTOR_ID'),
            'connector_number' => env('KAIZALA_PHONE_NUMBER'),
            'test_groupId' => env('KAIZALA_TESTGROUP_ID'),
            'test_groupId1' => env('KAIZALA_TESTGROUP_ID1')
        );

        return view('welcome', $config);
    }
}
