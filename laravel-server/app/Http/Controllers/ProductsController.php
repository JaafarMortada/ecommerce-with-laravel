<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
class ProductsController extends Controller
{
    public function addOrUpdateProduct(Request $request, $action = "add"){
        if($action == "add"){
            $product = new Product;
        }else{
            $product = Product::find($action);
        }

        $product->id = $request -> action;
        $product->name = $request->name ? $request->name : $product->name;
        $product->details = $request->details ? $request->details : $product->details;
        $product->category = $request->category ? $request->category : $product->category;
        $product->price = $request->price ? $request->price : $product->price;
        $product->image_path = $request->image_path ? $request->image_path : $product->image_path;
        $product->save();

        return json_encode(["product" => $product]);
    }

    function deleteProduct($id){
        Product::find($id)->delete();
        return json_encode(["product deleted." => true]);
    }

    function getProducts(){
        $products = Product::all();
        return json_encode(["products" => $products]);
    }
}
