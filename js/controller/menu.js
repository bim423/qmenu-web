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
})

function addProductToCart(productId) {
    let productContainer = $(`.product-container[data-product_id=${productId}]`);
    let productRemoveBtn = $(`.action-btn-remove[data-product_id=${productId}]`);
    let productQuantityBadge = $(`.product-quantity[data-product_id=${productId}]`);
    let productPrice = productContainer.data("price");
    cost = Number((cost + Number(productPrice)).toFixed(2));
    // Check if the cart contains this item
    let productQuantity = 1;
    for (let i=0; i<cart.length; i++) {
        let pid = cart[i].product_id;
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
        productOrder.product_id = productId;
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

function removeProductFromCart(productId) {
    let productContainer = $(`.product-container[data-product_id=${productId}]`);
    let productRemoveBtn = $(`.action-btn-remove[data-product_id=${productId}]`);
    let productQuantityBadge = $(`.product-quantity[data-product_id=${productId}]`);
    let productPrice = productContainer.data("price");
    cost = Number((cost - Number(productPrice)).toFixed(2));

    // Check if the cart contains this item
    let productQuantity = 1;
    for (let i=0; i<cart.length; i++) {
        let pid = cart[i].product_id;
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