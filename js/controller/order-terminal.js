let interval = 2000;
const PENDING_ORDER = 0;
const PROCESSING_ORDER = 1;
const DELIVERED_ORDER = 2;

$(document).ready(function () {
    listenAPI();
})

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
    for (let i=0; i<orders.length; i++) {
        let order = orders[i];
        // If this order is already delivered ignore it
        if (order.state === DELIVERED_ORDER) continue;

        // Extract order data
        if (order.state === PENDING_ORDER) {
            pendingOrders.push(order)
        } else if (order.state === PROCESSING_ORDER) {
            processingOrders.push(order)
        }
    }

    // Render pending orders
    let pendingOrdersContent = ""
    for (let i=0; i<pendingOrders.length; i++) {
        let order = pendingOrders[i];
        pendingOrdersContent += renderPendingOrder(order.id, order.arrivalTime, order.deskId, order.orderedProducts);
    }
    pendingOrdersContainer.html(pendingOrdersContent);

    // Set actions
    $(`.order-container .order-btn-approve`).click(function (e) {
        console.log(e.currentTarget)
        let orderId = e.currentTarget.parentNode.parentNode.dataset.orderId;
        console.log("Approve order: "+ orderId);
        setOrderState(orderId, PROCESSING_ORDER);
    })

    $(`.order-container .order-btn-deny`).click(function (e) {
        console.log(e.currentTarget)
        let orderId = e.currentTarget.parentNode.parentNode.dataset.orderId;
        console.log("Delete order: "+ orderId);
        deleteOrder(orderId);
    })


    // Render processing orders
    let processingOrdersContent = ""
    for (let i=0; i<processingOrders.length; i++) {
        let order = processingOrders[i];
        processingOrdersContent += renderProcessingOrder(order.id, order.arrivalTime, order.deskId, order.orderedProducts);
    }
    processingOrdersContainer.html(processingOrdersContent);

    // Set button events
    $(`.order-container .order-btn-deliver`).click(function (e) {
        let orderId = e.currentTarget.parentNode.parentNode.dataset.orderId;
        console.log("Set order state delivered: "+ orderId);
        setOrderState(orderId, DELIVERED_ORDER);
    })

    $(`.order-container .order-btn-revert`).click(function (e) {
        let orderId = e.currentTarget.parentNode.parentNode.dataset.orderId;
        console.log("Revert order: "+ orderId);
        setOrderState(orderId, PENDING_ORDER);
    })
}

/**
 * Create a pending order card html
 * @param orderId
 * @param arrivalTime
 * @param deskName
 * @param products
 * @returns {string} html code of card
 */
function renderPendingOrder(orderId, arrivalTime, deskName, products) {
    let orderContent = ""
    for (let i = 0; i<products.length; i++) {
        let product = products[i];
        orderContent += product.quantity + "x " + product.name;
    }

    let timePassed = formatTimePassed(arrivalTime);
    let labelTimePassed = "";


    if (Number(timePassed) === 0) labelTimePassed = "Just now";
    else labelTimePassed = timePassed + " minutes ago";

    let className = "warning";
    let badgesContent = `<span class="badge badge-warning">Pending</span>`;
    if (Number(timePassed) >= 10) {
        className = "danger";
        badgesContent = `<span class="badge badge-danger mr-2">Late</span>` + badgesContent;
    }

    // noinspection UnnecessaryLocalVariableJS
    let domOutput = `
        <div class="order-container order-container-${className}" data-order-id="${orderId}">
            <div class="order-desk-col">
                <div class="order-desk-name">${deskName}</div>
                <div class="order-arrival-time">${labelTimePassed}</div>
            </div>
            <div class="order-detail-col">
                ${orderContent}
            </div>
            <div class="order-badge-col">
                ${badgesContent}
            </div>

            <div class="order-action-col">
                <button class="btn btn-link order-btn-deny"><span class="fa fa-times"></span></button>
                <button class="btn btn-link order-btn-approve"><span class="fa fa-check"></span></button>
            </div>
        </div>
    `
    return domOutput;
}

/**
 * Create a processing order card html
 * @param orderId
 * @param arrivalTime
 * @param deskName
 * @param products
 * @returns {string} html code of card
 */
function renderProcessingOrder(orderId, arrivalTime, deskName, products) {
    let orderContent = ""
    let time = arrivalTime;
    for (let i = 0; i<products.length; i++) {
        let product = products[i];
        orderContent += product.quantity + "x " + product.name;
    }

    // noinspection UnnecessaryLocalVariableJS
    let domOutput = `
        <div class="order-container" data-order-id="${orderId}">
            <div class="order-desk-col">
                <div class="order-desk-name">${deskName}</div>
                <div class="order-arrival-time">${time}</div>
            </div>
            <div class="order-detail-col">
                ${orderContent}
            </div>
            <div class="order-badge-col">
                <span class="badge badge-success">Processing</span>
            </div>

            <div class="order-action-col">
                <button class="btn btn-link order-btn-revert"><span class="fa fa-undo"></span></button>
                <button class="btn btn-link order-btn-deliver"><span class="fa fa-location-arrow"></span></button>
            </div>
        </div>
    `

    return domOutput;
}

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

function formatTimePassed(dateTime) {
    let dateNow = new Date()
    let date = new Date(dateTime)
    let timePassed = dateNow.getTime() - date.getTime()

    let minutesPassed = timePassed / (1000*60)
    minutesPassed = Number(minutesPassed).toFixed(0)
    return minutesPassed;
}
