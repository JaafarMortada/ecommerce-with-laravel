<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
class CartsController extends Controller
{
    public function addToCart(Request $request){
        $cart_item = new Cart;
        $cart_item->user_id = $request->user_id;
        $cart_item->product_id = $request->product_id;
        $cart_item->save();

        return json_encode(["cart_item" => $cart_item]);
    }
}
