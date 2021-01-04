$(document).ready(function () {


    // Add event to the each table row
    $("#order-history-table ").on('click', 'tr', function (e) {
        let target = e.currentTarget;
        console.log(target)
        let orderId = target.dataset.orderId;
        if (orderId) {
            console.log("showing modal " + orderId)
            showDetailOrderDialog(orderId);
        }
    });
})
/**
 *TODO:
 */
function showDetailOrderDialog(orderId){
    showModalDialog("Order Details",
        `
            
            `,
        {label: "Cancel", class: "btn-danger", onClick: destroyModalDialogs},

    )
}
