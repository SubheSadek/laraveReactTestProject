<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Goutte\Client;

use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function scrapProducts(Request $request){
        $refresh = $request['refresh'] ?? false;
        $products = new Product();

        if($products->exists() && !$refresh){
            return $products->inRandomOrder()->get();
        }

        if($products->exists() && $refresh){
            $products->truncate();
        }
        
        $client = new Client();
        $website = $client->request('GET', 'https://aleshamart.com/category/health-beauty/make-up');
        $products = $website->filter('.product-section .row > div');

        $arr = array();
        $current_date =date("Y-m-d H:i:s", strtotime('now'));

        $products->each(function($product) use (&$arr, $current_date){
            if(count($arr) == 20) return;

            $arr[]= array(
                'prod_name' => $product->filter('h3')->text(),
                'prod_price' => $product->filter('h4')->text(),
                'prod_image' => $product->filter('img')->attr('src'),
                'created_at' => $current_date,
                'updated_at' => $current_date
            );

        });

        DB::table('products')->insert($arr);
        return Product::inRandomOrder()->get();
       
    }
}
