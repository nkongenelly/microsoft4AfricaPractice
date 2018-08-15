<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/', function () {
    return view('welcome');
});*/

Route::get('/',function(){
    return view ('one');
});
Route::get('/codewars',function(){
    return view ('codewars');
});
Route::get('/directions',function(){
    return view ('directions');
});
Route::get('/braces',function(){
    return view ('braces');
});
