<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\API\AuthController;
use Illuminate\Http\Request;
use App\Models\Favorite;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class FavoritesController extends Controller
{
    public function addToFavorites(Request $request){
        $fav_item = new Favorite;
        $user_id = auth()->user()->id;
        $fav_item->user_id = $user_id;
        $fav_item->product_id = $request->product_id;
        $fav_item->save();

        return json_encode(["fav_item" => $fav_item]);
    }

    public function viewFavorites(){
        $fav_items = Favorite::all()->where('user_id', auth()->user()->id);
        foreach($fav_items as $fav_item){
            $price = Product::find($fav_item->product_id)->price;
            $name = Product::find($fav_item->product_id)->name;
            $fav_item->name = $name;
            $fav_item->price = $price;
        }
        return json_encode(["fav_items" => $fav_items]);
    }
}
