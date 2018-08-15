<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Lesson;
use App\Unit;

class UnitsController extends Controller
{
    //
    public function store(Lesson $lesson){
        Unit::create([
            'units_name'=>request('units_name'),
            'units_hours'=>request('units_hours'),
            'id'=>request('id')
        ]);

        return back();
    }

    public function show($lesson_id){
        $lesson = Lesson::findOrFail($lesson_id);
        $units =$lesson->unit;
        echo $units;
    }
}

