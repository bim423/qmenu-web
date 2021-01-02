let menu = [];
let cart = [];
let cost = 0.00;
let orderSummary;

$(document).ready(function () {
    orderSummary = $("#order-summary");

    $(".action-btn-add").click(function (e) {
        let productId = e.currentTarget.dataset["product_id"]
        console.log("Add product " + productId)
        addProductToCart(productId)
    })

    $(".action-btn-remove").click(function (e) {
        let productId = e.currentTarget.dataset["product_id"]
        console.log("Remove product " + productId)
        removeProductFromCart(productId)
    })

    $("#btn-order-checkout").click(function (e) {
        actionOrderCheckout()
    })
})

/**
 * Add a product to the cart
 * @param productId
 */
function addProductToCart(productId) {
    let productContainer = $(`.product-container[data-product_id=${productId}]`);
    let productRemoveBtn = $(`.action-btn-remove[data-product_id=${productId}]`);
    let productQuantityBadge = $(`.product-quantity[data-product_id=${productId}]`);
    let productPrice = productContainer.data("price");
    let productName = productContainer.data("name");
    productId = Number(productId)

    cost = Number((cost + Number(productPrice)).toFixed(2));
    // Check if the cart contains this item
    let productQuantity = 1;
    for (let i=0; i<cart.length; i++) {
        let pid = cart[i].productId;
        if (pid && pid === productId) {
            // If the product exists, increase quantity
            cart[i].quantity++;
            productQuantity = cart[i].quantity;
            break;
        }
    }
    if (productQuantity === 1) {
        // Add product to the cart
        let productOrder = {}
        productOrder.productId = productId;
        productOrder.productName = productName;
        productOrder.quantity = 1;
        cart.push(productOrder)
    }
    // Update UI
    productRemoveBtn.show();
    productQuantityBadge.show();
    productQuantityBadge.text("Qty: "+ productQuantity);
    console.log(cost)
    // Update Summary
    updateOrderSummary();

}

/**
 * Remove a product from the cart
 * @param productId
 */
function removeProductFromCart(productId) {
    let productContainer = $(`.product-container[data-product_id=${productId}]`);
    let productRemoveBtn = $(`.action-btn-remove[data-product_id=${productId}]`);
    let productQuantityBadge = $(`.product-quantity[data-product_id=${productId}]`);
    let productPrice = productContainer.data("price");
    cost = Number((cost - Number(productPrice)).toFixed(2));

    // Check if the cart contains this item
    let productQuantity = 1;
    for (let i=0; i<cart.length; i++) {
        let pid = cart[i].productId;
        if (pid && pid === productId) {
            // Product found, decrease quantity
            cart[i].quantity--;
            productQuantity = cart[i].quantity;
            if (productQuantity === 0) {
                cart.slice(i,1);
                productRemoveBtn.hide();
                productQuantityBadge.hide();
            } else {
                productQuantityBadge.text("Qty: "+ productQuantity);
            }
            break;
        }
    }
    console.log(cost)
    updateOrderSummary();

}

/**
 * Update order summary content
 */
function updateOrderSummary() {
    //TODO: Update summary securely here
    if (cost <= 0) {
        orderSummary.css("animation", "0.5s fadeOutDown");
        orderSummary.css("visibility", "hidden");
        $("#order-cost").text(" ");
        return;
    }
    else  {
        orderSummary.css("animation", "0.1s fadeInUp");
        orderSummary.css("visibility", "visible");
    }
    $("#order-cost").text("$ "+ cost.toFixed(2));
}

/**
 * Make API request and verify desk for order. Show the order checkout UI.
 */
function actionOrderCheckout() {
    let deskCode =  $("#order-summary").data("desk-code");
    if (cost <= 0) return;
    // Get desk data from server
    $.ajax({
        url: API.DESK + "/" + deskCode,
        type: 'GET',
        contentType: 'application/json',
        success: function(data) {
            let deskId = data.id;
            let deskLabel = data.label;
            showOrderCheckoutContainer(deskLabel, deskId);
        },
        error : function (data) {
            alert("Couldn't place orders");
        }
    });
}

/**
 * Show order checkout container and hide menu content
 * @param deskLabel
 * @param deskId
 */
function showOrderCheckoutContainer(deskLabel, deskId) {
    // Get UI components
    let menuContent = $("#menu-content");
    let bottomBar = $(".bottom-bar");
    let alertBox = $("#menu-alert-content");

    // Hide menu and order summary bottom bar
    menuContent.hide();
    bottomBar.hide();

    // Build checkout content
    let orderContent = "";
    for (let i = 0; i<cart.length; i++) {
        let productOrder = cart[i]
        orderContent += productOrder.quantity + "x " +productOrder.productName + "<br>"
    }

    alertBox.html(`
        <!-- Order checkout container -->
        <div class="order-checkout-container">
            <h2><span class="fa fa-shopping-cart"></span> Checkout your order</h2>
        
            <label>Your desk:</label> ${deskLabel} <br>
            ${orderContent}
            
            <div class="row-balance">
                <div class="col-balance">
                    <label>Balance:</label> $ ${Number(cost).toFixed(2)}
                </div>
                <div class="col-balance-action">
                    <button id="btn-back-menu" class="menu-btn">Back</button>
                    <button id="btn-place-order" class="menu-btn menu-btn-confirm">Place Order</button>
                </div>
            </div>    
        </div>
       
    `)

    // Set events
    $("#btn-back-menu").click(function (e) {
        hideOrderCheckoutContainer();
    });

    $("#btn-place-order").click(function (e) {
        placeOrder(deskId, cart)
    })

    // Show check out container
    $(".order-checkout-container").fadeIn();
}

/**
 * Hide order checkout container and show menu content
 */
function hideOrderCheckoutContainer() {
    $("#menu-content").fadeIn();
    $(".bottom-bar").fadeIn();
    $(".order-checkout-container").hide();
}

function showOrderCompleteContainer(deskLabel) {
    // Get UI components
    let menuContent = $("#menu-content");
    let bottomBar = $(".bottom-bar");
    let alertBox = $("#menu-alert-content");

    // Hide menu and order summary bottom bar
    menuContent.hide();
    bottomBar.hide();
    alertBox.hide()

    let currentTime = new Date();
    let time = currentTime.getHours() + ":" + currentTime.getMinutes();
    alertBox.html(`
        <!-- Order complete container -->
        <div class="order-complete-container">
            <h2><span class="fa fa-check"></span> Your order has been sent successfully!</h2>
            Congratulations! Your order has sent to the restaurant personnel.<br><br>
            <label>Your desk: </label> ${deskLabel}<br>
            <label>Order time: </label> ${time}<br>
            <label>Balance:</label> $ ${Number(cost).toFixed(2)}
        </div>
    `)

    // Show check out container
    alertBox.fadeIn();
}

function placeOrder(deskId, products) {
    let requestBody = {
        "state" : 0,
        "deskId" : deskId,
        "orderedProducts" : products
    }

    $.ajax({
        url: API.ORDER + "/place",
        type: 'PUT',
        data: JSON.stringify(requestBody),
        contentType: 'application/json',
        success: function(data) {
            // Append category to the category list
            showOrderCompleteContainer()
            console.log(data)
        },
        error : function (data) {
            alert(data.message);
        }
    });
}