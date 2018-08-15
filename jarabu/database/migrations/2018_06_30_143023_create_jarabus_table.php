<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJarabusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jarabus', function (Blueprint $table) {
            $table->increments('id');
            $table->string('fullName');
            $table->smallInteger('phoneNumber');
            $table->string('emailAddress');
            $table->text('messaage');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jarabus');
    }
}
