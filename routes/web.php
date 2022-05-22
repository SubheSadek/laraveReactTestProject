<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;


Route::get('/', function () {
    return view('welcome');
});




Route::group(['prefix' => 'product'], function () {
    
    Route::get('/scrapProducts', [ProductController::class, 'scrapProducts']);

});

Route::get('/{all?}', function () {
    return view('welcome');
})->where(['all' => '.*']);
