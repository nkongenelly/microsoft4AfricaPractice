<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Lecturer;
use App\Unit;
use App\Lesson;

class LecturersController extends Controller
{
    //
    public function show($units_id){
        $lesson = Unit::findOrFail($units_id);
        $units =$lesson->Lecturer;
       echo $units;
       
    }
}
