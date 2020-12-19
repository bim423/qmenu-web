$(document).ready(function () {
    // Edit event
    $(`.btn-table-action[data-action="edit"]`).click(function (e) {
        let target = e.currentTarget;
        let deskId = target.parentElement.parentElement.dataset.deskId;
        if (deskId) {
            actionEditDesk(deskId)
        }
    });

    // Delete event
    $(`.btn-table-action[data-action="delete"]`).click(function (e) {
        let target = e.currentTarget;
        let deskId = target.parentElement.parentElement.dataset.deskId;
        if (deskId) {
            actionDeleteDesk(deskId)
        }
    });

    // Get QCode event
    $(`.btn-table-action[data-action="code"]`).click(function (e) {
        let target = e.currentTarget;
        let deskId = target.parentElement.parentElement.dataset.deskId;
        if (deskId) {
            actionGetCode(deskId)
        }
    });
})

function addNewDesk() {

}

function actionEditDesk(deskId) {
    let deskName = $(`tr[data-desk-id=${deskId}]`).data().deskLabel;
    showModalDialog("Edit desk", `
        <h1>${deskId}</h1>    
    `, {
            label : "Cancel",
            class: "btn-danger",
            onClick: destroyModalDialogs
        },
        {
            label : "Save",
            class: "btn-success",
            onClick: function () {
                console.log("I am the save action");
            }
        }
    );
}

function actionDeleteDesk(deskId) {
    let deskName = $(`tr[data-desk-id=${deskId}]`).data().deskLabel;
    showModalDialog("Delete desk", `
        <p>Are you sure you want to delete the desk, ${deskName}</p>    
    `, {
            label : "Cancel",
            class: "btn-secondary",
            onClick: destroyModalDialogs
        },
        {
            label : "Delete",
            class: "btn-danger",
            onClick: function () {
                console.log("I am the save action");
            }
        }
    );
}

function actionGetCode(deskId) {
    let deskName = $(`tr[data-desk-id=${deskId}]`).data().deskLabel;
    showModalDialog("QR Code", `
       <div id="qrcode-container-${deskId}" class="qrcode-container">
            <div class="qrcode-label">${deskName}</div>
            <div class="qrcode" id="qcode-${deskId}"></div>       
       </div>
           
    `, {
            label: "OK",
            class: "btn-secondary",
            onClick: destroyModalDialogs
        },
        {
            label: "Print",
            class: "btn-secondary",
            onClick: function () {
                showPrintWindow(`qrcode-container-${deskId}`);
            }
        }
    );
    new QRCode(document.getElementById(`qcode-${deskId}`), deskId);
}

function showPrintWindow(qrCodeId) {
    let printwin = window.open("", "new", "width=600,height=400");
    let qrCodeContent = document.getElementById(qrCodeId).innerHTML;

    let qrCodeDocument = `
        <html lang="en">
            <head>
                <title>QR code</title>
                <link rel="stylesheet" href="css/qrcode.css">            
            </head>
            <body>
                ${qrCodeContent}
            </body>
        </html>
    `
    printwin.document.write(qrCodeDocument);
    //printwin.print();

}