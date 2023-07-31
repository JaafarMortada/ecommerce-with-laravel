<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;

class CartsController extends Controller
{
    public function addToCart(Request $request){
        $user_id = auth()->user()->id;
        $cart_item = new Cart;
        $cart_item->user_id = $user_id;
        $cart_item->product_id = $request->product_id;
        $cart_item->save();
        return json_encode(["cart_item" => $cart_item]);
    }

    public function viewCart(){
        $total = 0;
        $user_id = auth()->user()->id;
        $cart_items = Cart::all()->where('user_id', $user_id);
        foreach($cart_items as $cart_item){
            try{
                $price = Product::find($cart_item->product_id)->price;
                $name = Product::find($cart_item->product_id)->name;
                $cart_item->name = $name;
                $cart_item->price = $price;
                $total += intval($price);
            } catch (\Throwable $th) {
                $cart_item->name = 'Deleted Item';
                $cart_item->price = 0;
            }}
        return json_encode(["cart_items" => $cart_items, "total" => $total]);
    }
}
