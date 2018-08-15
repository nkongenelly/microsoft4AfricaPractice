<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    //;
   protected $guarded = ['lesson_id'];
   
   public function unit(){
    return $this->hasMany(
        'App\Unit');
    }
}
