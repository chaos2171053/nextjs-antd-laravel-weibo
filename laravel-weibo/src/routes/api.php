
<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::group([
    'prefix' => 'v1',
], function () {
    Route::post('sign_in', 'Api\AuthController@signIn');
    Route::post('sign_up', 'Api\AuthController@signUp');

    Route::group([
        'middleware' => 'auth:api',
    ], function () {
        Route::get('user_info', 'Api\AuthController@userInfo');
    });
});
