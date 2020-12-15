<?php

// TODO: Retrieve Menu from the API
$menu_data = file_get_contents("assets/demo/menu.json");
$menu_obj = json_decode($menu_data);

/**
 * Generates the menu content
 * @param $menu_object
 * @return string HTML code of menu
 */
function get_menu_content($menu_object){
    // Build menu
    $menu = "";
    $sub_menus = $menu_object->menu;
    foreach ($sub_menus as $sub_menu) {
        // Build each sub menu
        $category_name = $sub_menu->category;
        $description = $sub_menu->descripton;
        $products = $sub_menu->products;
        // Get product list
        $products_content = get_products_content($products);

        $sub_menu_content = <<<HTML
        <div class="submenu-container">
            <div class="submenu-header"> <h2>$category_name</h2> </div>
            <div class="submenu-description">$description</div>
            $products_content    
        </div>
HTML;
        // Add submenu to the menu
        $menu .= $sub_menu_content;
    }

    // Print out
    return $menu;
}

/**
 * Generates the product containers
 * @param $products array Array of products
 * @return string HTML code of the product list
 */
function get_products_content($products){
    $products_content = "";
    foreach ($products as $product) {
        $product_price = number_format($product->price, 2);
        $products_content .= <<<HTML
        <div class="product-container" data-product_id="$product->product_id" data-price="$product_price">
            <div class="product-info-row">
                <div class="product-name"><h3>$product->product_name</h3></div>
                <div class="product-price"><span class="product-quantity hidden" data-product_id="$product->product_id">Qty: 0</span>\$ $product_price</div>
            </div>
            <div class="product-detail-row">
                <div class="product-description">$product->description</div>
                <div class="product-actions">
                    <button class="action-btn-remove hidden" data-product_id="$product->product_id">
                        <span class="fa fa-minus"></span>
                    </button>
                    <button class="action-btn-add" data-product_id="$product->product_id">
                        <span class="fa fa-plus"></span>
                    </button>
                </div>
            </div>
        </div>
HTML;
    }

    return $products_content;
}


?>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>
    <title>Restaurant - Menu</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js"
            crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <link rel="stylesheet" href="css/custom.css">
    <link rel="stylesheet" href="css/menu.css">
</head>
<body>

<div class="menu-container">
    <div class="menu-header">
        <img class="menu-header-logo" src="assets/img/logo.jpg" />
    </div>
    <!--<span class="product-quantity">Qty: 2</span>-->
    <?php echo get_menu_content($menu_obj);?>
</div>

<div class="bottom-bar">
    <div id="order-summary" class="order-summary-container" style="visibility: hidden">
        <div class="order-detail-column">
            <div class="order-desk">Your Desk: A1</div>
            <div id="order-cost" class="order-cost">$ 0.00</div>
        </div>
        <div class="order-confirm-column">
            <button class="confirm-order-btn">Order</button>
        </div>
    </div>
</div>


<!-- Scripts -->
<script src="js/vendor/jquery-3.5.1.slim.js" crossorigin="anonymous"></script>
<script src="js/controller/menu.js"></script>
</body>
</html>

