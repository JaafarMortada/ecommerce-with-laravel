<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Favorite;

class FavoritesController extends Controller
{
    public function addToFavorites(Request $request){
        $fav_item = new Favorite;
        $fav_item->user_id = $request->user_id;
        $fav_item->product_id = $request->product_id;
        $fav_item->save();

        return json_encode(["fav_item" => $fav_item]);
    }
}
