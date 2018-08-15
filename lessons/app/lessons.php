<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class lessons extends Model
{
    public function unassignedLessons()
    {
        return false;
    }
}
