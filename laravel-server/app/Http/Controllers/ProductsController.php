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
        $file_name = time()."product_image".".".$request->image_path->extension();
        $request -> image_path ->move(storage_path('images'),$file_name);
        $product-> image_path = storage_path("images")."\\".$file_name;
        $product->save();

        return json_encode(["product" => $product]);
    }

    function deleteProduct($id){
        Product::find($id)->delete();
        return json_encode(["product deleted." => true]);
    }

    function getProducts(){
        $products = Product::all();
        foreach($products as $product) 
        {
            $image64 = base64_encode(file_get_contents($product->image_path));
            $product -> image_path = $image64;
        }
        return json_encode(["products" => $products]);
    }
}
