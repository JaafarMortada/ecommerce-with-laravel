<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\CartsController;
use App\Http\Controllers\FavoritesController;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/view_fav/{action?}', [FavoritesController::class, "viewFavorites"]);
Route::post('/add_to_favorites/{action?}', [FavoritesController::class, "addToFavorites"]);


Route::post('/add_update_product/{action?}', [ProductsController::class, "addOrUpdateProduct"]);
Route::get('/delete_product/{id}', [ProductsController::class, "deleteProduct"]);
Route::post('/dashboard', [ProductsController::class, "getProducts"]);

Route::post('/add_to_cart/{action?}', [CartsController::class, "addToCart"]);
Route::post('/view_cart/{action?}', [CartsController::class, "viewCart"]);

