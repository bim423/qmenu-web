let interval = 2000;
const PENDING_ORDER = 0;
const PROCESSING_ORDER = 1;
const DELIVERED_ORDER = 2;

$(document).ready(function () {
    listenAPI();
})

/**
 * Check state of the orders asynchronously
 */
async function listenAPI() {
    $.ajax({
        url: API.ORDER,
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            // Update terminal
            updateTerminalUI(data)
            setTimeout(listenAPI, interval);
        }
    })
}

/**
 * Decode order data and update Terminal UI
 * @param orders
 */
function updateTerminalUI(orders) {
    let pendingOrders = [];
    let processingOrders = [];
    let pendingOrdersContainer = $("#pending-orders");
    let processingOrdersContainer = $("#processing-orders");

    // Categorize orders
    for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
        // If this order is already delivered ignore it
        if (order.state === DELIVERED_ORDER) continue;

        // Extract order data
        if (order.state === PENDING_ORDER) pendingOrders.push(order)
        else if (order.state === PROCESSING_ORDER) processingOrders.push(order)
    }

    // Render pending orders
    let pendingOrdersContent = ""
    for (let i = 0; i < pendingOrders.length; i++) {
        let order = pendingOrders[i];
        //pendingOrdersContent += renderPendingOrder(order.id, order.arrivalTime, order.deskLabel, order.orderedProducts);
        pendingOrdersContent += renderOrderContainer(order.id, order.arrivalTime, order.deskLabel, order.orderedProducts, PENDING_ORDER);
    }
    pendingOrdersContainer.html(pendingOrdersContent);

    // Set actions
    $(`.order-container .order-btn-approve`).click(function (e) {
        let orderContainer = e.currentTarget.parentNode.parentNode;
        let orderId = orderContainer.dataset.orderId;
        orderContainer.style = "opacity: 0.4";
        console.log("Approve order: " + orderId);
        setOrderState(orderId, PROCESSING_ORDER);
    })

    $(`.order-container .order-btn-deny`).click(function (e) {
        let orderContainer = e.currentTarget.parentNode.parentNode;
        let orderId = orderContainer.dataset.orderId;
        orderContainer.style = "opacity: 0.4";
        deleteOrder(orderId);
        console.log("Delete order: " + orderId);
    })


    // Render processing orders
    let processingOrdersContent = ""
    for (let i = 0; i < processingOrders.length; i++) {
        let order = processingOrders[i];
        // processingOrdersContent += renderProcessingOrder(order.id, order.arrivalTime, order.deskLabel, order.orderedProducts);
        processingOrdersContent += renderOrderContainer(order.id, order.arrivalTime, order.deskLabel, order.orderedProducts, PROCESSING_ORDER);

    }
    processingOrdersContainer.html(processingOrdersContent);

    // Set button events
    $(`.order-container .order-btn-deliver`).click(function (e) {
        let orderContainer = e.currentTarget.parentNode.parentNode;
        let orderId = orderContainer.dataset.orderId;
        orderContainer.style = "opacity: 0.4";
        setOrderState(orderId, DELIVERED_ORDER);
        console.log("Set order state delivered: " + orderId);
    })

    $(`.order-container .order-btn-revert`).click(function (e) {
        let orderContainer = e.currentTarget.parentNode.parentNode;
        let orderId = orderContainer.dataset.orderId;
        orderContainer.style = "opacity: 0.4";
        setOrderState(orderId, PENDING_ORDER);
        console.log("Revert order: " + orderId);
    })
}

/**
 * Build order container content
 * @param orderId
 * @param arrivalTime
 * @param deskLabel
 * @param products
 * @param state
 * @returns {string}
 */
function renderOrderContainer(orderId, arrivalTime, deskLabel, products, state) {
    // Generate order content
    let orderContent = ""
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        orderContent += product.quantity + "x " + product.productName + "<br>";
    }

    // Generate human friendly time string
    let timePassed = formatTimePassed(arrivalTime);
    let labelTimePassed = "";

    if (Number(timePassed) === 0) labelTimePassed = "Just now";
    else labelTimePassed = timePassed + " minutes ago";

    // Generate badges content, container class and actions
    let className = ""
    let badgesContent = ""
    let actionsContent = ""

    if (state === PENDING_ORDER) {
        className = "order-container-warning";
        badgesContent = `<span class="badge badge-warning">Pending</span>`;

        if (Number(timePassed) >= 10) {
            className = "order-container-danger";
            badgesContent = `<span class="badge badge-danger mr-2">Late</span>` + badgesContent;
        }

        actionsContent = `
                <button class="btn btn-link order-btn-deny"><span class="fa fa-times"></span></button>
                <button class="btn btn-link order-btn-approve"><span class="fa fa-check"></span></button>`;

    } else if (state === PROCESSING_ORDER) {
        badgesContent = `<span class="badge badge-success">Processing</span>`

        if (Number(timePassed) >= 15) {
            badgesContent = `<span class="badge badge-danger mr-2">Late</span>` + badgesContent;
        }

        actionsContent = `
                <button class="btn btn-link order-btn-revert"><span class="fa fa-undo"></span></button>
                <button class="btn btn-link order-btn-deliver"><span class="fa fa-location-arrow"></span></button>`;

    }

    let orderContainerContent = `
        <div class="order-container ${className}" data-order-id="${orderId}">
            <div class="order-desk-col">
                <div class="order-desk-name">${deskLabel}</div>
                <div class="order-arrival-time">${labelTimePassed}</div>
            </div>
            <div class="order-detail-col">${orderContent}</div>
            <div class="order-badge-col">${badgesContent}</div>
            <div class="order-action-col">${actionsContent}</div>
        </div>
    `

    return orderContainerContent
}

/**
 * Make API Request and set order state to any other state
 * @param {int} orderId
 * @param {int} state
 */
function setOrderState(orderId, state) {
    let requestBody = {
        id: orderId,
        state: state
    };

    $.ajax({
        url: API.ORDER + "/state",
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(requestBody),
        success: function (data) {
            console.log(data.message)
        }
    })
}

/**
 * Make API request and delete order
 * @param {int} orderId
 */
function deleteOrder(orderId) {
    $.ajax({
        url: API.ORDER + "/delete/" + orderId,
        type: 'DELETE',
        contentType: 'application/json',
        success: function (data) {
            console.log(data.message)
        }
    })
}

/**
 * Generate minutes string from the arrival time string
 * @param {string} dateTime
 * @returns {string}
 */
function formatTimePassed(dateTime) {
    let dateNow = new Date()
    let date = new Date(dateTime)
    let timePassed = dateNow.getTime() - date.getTime()

    let minutesPassed = timePassed / (1000 * 60)
    minutesPassed = Number(minutesPassed).toFixed(0)
    return minutesPassed;
}
