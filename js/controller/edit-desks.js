// TODO: Retrieve desk IDS from desk API
let deskIndex = 100;

$(document).ready(function () {
    // Add new desk event
    $("#btn-new-desk").click(function (e) {
        actionNewDesk();
    });

    initEvents();
})

function initEvents() {
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
}

function addNewDesk(deskId, deskLabel) {
    $("#desk-editor-table-body").append(`
        <tr data-desk-id="${deskId}" data-desk-label="${deskLabel}">
            <th class="desk-table-label" scope="row">${deskLabel}</th>
            <td class="desk-table-actions">
                <button class="btn-table-action text-primary" data-action="edit"><span class="fa fa-pen"></span></button>
                <button class="btn-table-action text-danger" data-action="delete"><span class="fa fa-trash"></span></button>
                <button class="btn-table-action text-success" data-action="code"><span class="fa fa-qrcode"></span></button>
            </td>
        </tr>
    `);
    initEvents();
}

function updateDesk(deskId, deskLabel) {
    $(`tr[data-desk-id="${deskId}"] .desk-table-label`).text(deskLabel);
    $(`tr[data-desk-id="${deskId}"]`).data("desk-label", deskLabel);

}

function deleteDesk(deskId) {
    $(`tr[data-desk-id="${deskId}"]`).remove();
}

function actionNewDesk() {
    showModalDialog("Create new desk", `
        
        <div class="form-row">
            <div class="col-3">
                <label class="font-weight-bold">Desk label:</label>
            </div>
            <div class="col-9">
                <input id="input-desk-label" type="text" class="form-control" placeholder="Enter desk label">
            </div>
        </div>
            
    `, {
            label: "Cancel",
            class: "btn-danger",
            onClick: destroyModalDialogs
        },
        {
            label: "Create",
            class: "btn-success",
            onClick: function () {
                // TODO: API request
                let inputDeskLabel = $("#input-desk-label").val();
                addNewDesk(deskIndex, inputDeskLabel);
                deskIndex++;
                destroyModalDialogs();
            }
        }
    );
}

function actionEditDesk(deskId) {
    let deskName = $(`tr[data-desk-id=${deskId}]`).data().deskLabel;
    showModalDialog("Edit desk", `
        <div class="form-row">
            <div class="col-3">
                <label class="font-weight-bold">Desk label:</label>
            </div>
            <div class="col-9">
                <input id="input-desk-label" type="text" class="form-control" placeholder="Enter desk label" value="${deskName}">
            </div>
        </div> 
    `, {
            label: "Cancel",
            class: "btn-danger",
            onClick: destroyModalDialogs
        },
        {
            label: "Save",
            class: "btn-success",
            onClick: function () {
                // TODO: Make API request
                let inputDeskLabel = $("#input-desk-label").val();
                updateDesk(deskId, inputDeskLabel);
                destroyModalDialogs();
            }
        }
    );
}

function actionDeleteDesk(deskId) {
    let deskName = $(`tr[data-desk-id=${deskId}]`).data().deskLabel;
    showModalDialog("Delete desk", `
        <p>Are you sure you want to delete the desk, ${deskName}</p>    
    `, {
            label: "Cancel",
            class: "btn-secondary",
            onClick: destroyModalDialogs
        },
        {
            label: "Delete",
            class: "btn-danger",
            onClick: function () {
                // TODO: Make API request
                deleteDesk(deskId);
                destroyModalDialogs();
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
            label: "Print",
            class: "btn-secondary",
            onClick: function () {
                showPrintWindow(`qrcode-container-${deskId}`);
            }
        }, {
            label: "Close",
            class: "btn-danger",
            onClick: destroyModalDialogs
        }
    );
    new QRCode(document.getElementById(`qcode-${deskId}`), deskId);
}

function showPrintWindow(qrCodeId) {
    // Get styling
    let printwin = window.open("", "_blank", "width=600, height=300");
    let qrCodeContent = document.getElementById(qrCodeId).innerHTML;
    let qrCodeDocument = `
        <html lang="en">
            <head>
                <title>QR code</title>         
            </head>
            <body> 
                ${qrCodeContent}
            </body>
        </html>
    `
    printwin.document.write(qrCodeDocument);
    printwin.print();
}