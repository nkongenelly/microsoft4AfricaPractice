<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    //
protected $primaryKey = 'units_id';
    public function lesson(){
        return $this->belongsTo(
            'App\Lesson');
        
    }
    public function lecturer(){
        return $this->belongsTo(
            'App\Lecturer');
        
    }
}
