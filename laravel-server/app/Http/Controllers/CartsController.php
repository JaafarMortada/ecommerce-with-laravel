<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;

class CartsController extends Controller
{
    public function addToCart(Request $request){
        $cart_item = new Cart;
        $cart_item->user_id = $request->user_id;
        $cart_item->product_id = $request->product_id;
        $cart_item->save();

        return json_encode(["cart_item" => $cart_item]);
    }

    public function viewCart(Request $request){
        $total = 0;
        $cart_items = Cart::all()->where('user_id', $request->user_id);
        foreach($cart_items as $cart_item){
            $price = Product::find($cart_item->product_id)->price;
            $total += intval($price);
        }
        // $cart_items->save();
        return json_encode(["cart_items" => $cart_items, "total" => $total]);
    }
}
