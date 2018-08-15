<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lecturer extends Model
{
    //
    protected $primaryKey = 'lecturer_id';
    

    public function unitLecturer(){
        return $this->hasMany('App\Unit');
        }
}
