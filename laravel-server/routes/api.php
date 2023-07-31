<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\CartsController;
use App\Http\Controllers\FavoritesController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::post('/add_update_product/{action?}', [ProductsController::class, "addOrUpdateProduct"]);
Route::get('/delete_product/{id}', [ProductsController::class, "deleteProduct"]);
Route::post('/dashboard', [ProductsController::class, "getProducts"]);

Route::post('/add_to_cart/{action?}', [CartsController::class, "addToCart"]);
Route::post('/view_cart/{action?}', [CartsController::class, "viewCart"]);
Route::post('/add_to_favorites/{action?}', [FavoritesController::class, "addToFavorites"]);