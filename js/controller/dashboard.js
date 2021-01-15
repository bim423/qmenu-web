/**
 * Controller script for the dashboard
 **/
let menu;
let orders;
let dailyOrders;
let monthlyOrders;
let dailyRevenue = 0;
let monthlyRevenue = 0;
let ordersOfDayByTime;
let ordersOfMonthByDay;

$(document).ready(function () {
    // Initialize datasets
    ordersOfDayByTime = new Array(13).fill(0);
    ordersOfMonthByDay = new Array(31).fill(0);
    // Load data
    loadMenuData();
});

function loadMenuData() {
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
            orders = [];
            // Add cost to the orders
            for (let i=0; i<data.length; i++) {
                let order = data[i]
                let orderedProducts = order.orderedProducts;
                let cost = calculateCost(orderedProducts);
                order.cost = cost;
                orders.push(order)
            }
            // Filter orders
            dailyOrders = filterOrdersDaily(orders);
            monthlyOrders = filterOrdersMonthly(orders);
            buildTable(orders);
            initializeCards();
            drawCharts();
        }
    })
}

function initializeCards() {
    $("#daily-orders-label").text(dailyOrders.length);
    $("#daily-revenue-label").text("$ "+Number(dailyRevenue).toFixed(2))
    $("#monthly-orders-label").text(monthlyOrders.length);
    $("#monthly-revenue-label").text("$ "+Number(monthlyRevenue).toFixed(2));
}

/**
 * Filter orders that arrival time interval is in today's boundaries.
 * @param orders
 */
function filterOrdersDaily(orders) {
    let filtered = [];
    let now = new Date()
    let timeLimitStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0);
    let timeLimitEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23,59,59);

    for (let i=0; i<orders.length; i++) {
        let order = orders[i];
        let orderDate = new Date(order.arrivalTime);
        if (orderDate > timeLimitStart && orderDate<timeLimitEnd) {
            let orderHourIndex = 0;
            let orderHour = Number(orderDate.getHours());

            if (orderHour < 8) orderHourIndex = 0
            else orderHourIndex = orderHour - 8;

            ordersOfDayByTime[orderHourIndex] += 1;
            dailyRevenue += Number(order.cost);
            filtered.push(order);
        }
    }

    return filtered;
}

/**
 * Filter orders that arrival time interval is in this month's boundaries.
 * @param orders
 */
function filterOrdersMonthly(orders) {
    let filtered = [];
    let now = new Date()
    let timeLimitStart = new Date(now.getFullYear(), now.getMonth(), 1);
    let timeLimitEnd = new Date(now.getFullYear(), now.getMonth(), 31);

    for (let i=0; i<orders.length; i++) {
        let order = orders[i];
        let orderDate = new Date(order.arrivalTime);
        if (orderDate > timeLimitStart && orderDate<timeLimitEnd) {
            let day = orderDate.getDate();
            ordersOfMonthByDay[""+day] += order.cost;
            monthlyRevenue += Number(order.cost);
            filtered.push(order);
        }
    }

    return filtered;
}

/**
 * Build recent orders table
 * @param orders
 */
function buildTable(orders) {
    let order_history_table = $(".table-recent-orders tbody")

    let limit = 5;
    if (orders.length < 5) limit = orders.length;

    let tableBodyContent = ``;
    for(let i=0; i<limit; i++) {
        let order = orders[i];
        let orderDetail = formatOrderDetail(order.orderedProducts);
        let cost = order.cost
        let state = formatState(order.state)

        tableBodyContent += `
            <tr data-order-id="${order.id}">
                <td class="order-desk-label">${order.deskLabel}</td>
                <td class="order-detail">${orderDetail}</td>
                <td class="order-status">${state}</td>
                <td class="order-cost">$ ${Number(cost).toFixed(2)}</td>
            </tr>  
        `;

    }

    order_history_table.append(tableBodyContent)
    $("#order-history-table").DataTable({autoWidth: false})
}

/**
 * Draw dashboard charts
 */
function drawCharts(){
    // Orders hourly chart
    let ctx = document.getElementById("myAreaChart");
    let ordersHourlyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
            datasets: [{
                label: "Orders",
                lineTension: 0.3,
                backgroundColor: "rgba(255,142,65,0.2)",
                borderColor: "rgba(255,142,65,1)",
                pointRadius: 5,
                pointBackgroundColor: "rgba(255,142,65,1)",
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(255,142,65,1)",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: ordersOfDayByTime,
            }],
        },
        options: {
            scales: {
                xAxes: [{
                    time: {
                        unit: 'date'
                    },
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        maxTicksLimit: 7
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, .125)",
                    }
                }],
            },
            legend: {
                display: false
            }
        }
    });

    // Monthly revenue chart
    let barChart = document.getElementById("myBarChart");
    let monthlyRevenueChart = new Chart(barChart, {
        type: 'bar',
        data: {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15",
                "16", "17", "18", "19", "20", "21", "22", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
            datasets: [{
                label: "Revenue",
                backgroundColor: "rgba(255,142,65,1)",
                borderColor: "rgba(255,142,65,1)",
                data: ordersOfMonthByDay,
            }],
        },
        options: {
            scales: {
                xAxes: [{
                    time: {
                        unit: 'month'
                    },
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 6
                    }
                }],
                yAxes: [{
                    ticks: {
                        maxTicksLimit: 5
                    },
                    gridLines: {
                        display: true
                    }
                }],
            },
            legend: {
                display: false
            }
        }
    })
}

/**
 * Helpers
 */
function calculateCost(orderedProducts) {
    let cost = 0;
    for (let i=0; i<orderedProducts.length; i++) {
        let orderedProduct = orderedProducts[i];
        let price = getProductCostById(orderedProduct.productId);
        if (price !== undefined)
            cost += (price * orderedProduct.quantity)
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