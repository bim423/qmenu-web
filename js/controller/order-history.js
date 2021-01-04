let menu;
let orders;

$(document).ready(function () {
    // Get restaurant menu
    getMenu()
})

function getMenu() {
    // Get menu from rest API
    $.ajax({
        url: API.MENU,
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            menu = data;
            getOrders()
        }
    })
}

function getOrders() {
    // Get orders from rest API
    $.ajax({
        url: API.ORDER,
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            orders = data;
            buildTable(orders)
        }
    })
}

function buildTable(orders) {
    let order_history_table = $("#order-history-table tbody")

    let tableBodyContent = ``;
    for(let i=0; i<orders.length; i++) {
        let order = orders[i];
        let orderDetail = formatOrderDetail(order.orderedProducts);
        let cost = calculateCost(order.orderedProducts)
        let date = formatDate(order.arrivalTime)
        let state = formatState(order.state)

        tableBodyContent += `
            <tr data-order-id="${order.id}">
                <td class="order-desk-label">${order.deskLabel}</td>
                <td class="order-detail">${orderDetail}</td>
                <td>${date}</td>
                <td class="order-state">${state}</td>
                <td class="order-cost">$ ${Number(cost).toFixed(2)}</td>
            </tr>
            
        `;

        }

    order_history_table.append(tableBodyContent)
    $("#order-history-table").DataTable({autoWidth: false})
}

function calculateCost(orderedProducts) {
    let cost = 0;
    for (let i=0; i<orderedProducts.length; i++) {
        let orderedProduct = orderedProducts[i];
        let price = getProductCostById(orderedProduct.productId);
        if (price !== undefined)
            cost += price
    }
    return cost;
}

function getProductCostById(productId) {
    let subMenus = menu.menu
    for (let i=0; i<subMenus.length; i++) {
        let subMenuProducts = subMenus[i].products;
        for (let j=0; j<subMenuProducts.length; j++) {
            let product = subMenuProducts[j];
            if (product.id === productId) {
                return product.price;
            }
        }
    }
    return undefined
}

function formatDate(arrivalTime) {
    return arrivalTime;
}

function formatState(state) {
    if (state === 0) {
        return `<span class="text-danger">Pending</span>`
    } else if (state === 1) {
        return `<span class="text-warning">Processing</span>`
    } else{
        return `<span class="text-success">Delivered</span>`
    }
}

function formatOrderDetail(orderedProducts) {
    let orderDetailContent = ``;
    for (let i=0; i<orderedProducts.length; i++) {
        let orderedProduct = orderedProducts[i];
        orderDetailContent += `${orderedProduct.quantity}x ${orderedProduct.productName}<br>`
    }
    return orderDetailContent
}

/**
 *TODO: Not needed yet
 */
function showDetailOrderDialog(orderId){
    showModalDialog("Order Details",
        `
            
            `,
        {label: "Cancel", class: "btn-danger", onClick: destroyModalDialogs},

    )
}
