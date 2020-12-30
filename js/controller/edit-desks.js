$(document).ready(function () {
    // Add new desk event
    $("#btn-new-desk").click(function (e) {
        actionNewDesk();
    });

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


/**
 * Make API request and create a new desk
 * @param deskLabel
 */
function createNewDesk(deskLabel) {
    let requestBody = {
        "label": deskLabel
    }

    $.ajax({
        url: API.DESK,
        type: 'PUT',
        data: JSON.stringify(requestBody),
        contentType: 'application/json',
        success: function(data) {
            // Append category to the category list
            let deskId = data.id;
            let deskCode = data.deskCode;

            $("#desk-editor-table-body").append(`
                <tr data-desk-id="${deskId}" data-desk-label="${deskLabel}" data-desk-code="${deskCode}">
                    <th class="desk-table-label" scope="row">${deskLabel}</th>
                    <td class="desk-table-actions">
                        <button class="btn-table-action text-primary" data-action="edit"><span class="fa fa-pen"></span></button>
                        <button class="btn-table-action text-danger" data-action="delete"><span class="fa fa-trash"></span></button>
                        <button class="btn-table-action text-success" data-action="code"><span class="fa fa-qrcode"></span></button>
                    </td>
                </tr>
            `);

            // Connect events to the new row
            $(`tr[data-desk-id=${deskId}] .btn-table-action`).click(function (e) {
                let action = e.currentTarget.dataset.action
                if (action === "edit"){
                    actionEditDesk(deskId)
                } else if (action === "delete") {
                    actionDeleteDesk(deskId)
                } else if (action === "code") {
                    actionGetCode(deskId)
                }
            })
        },
        error : function (data) {
            alert(data.message);
        }
    });


}

/**
 * Make API request and update a desk
 * @param deskId
 * @param deskLabel
 */
function updateDesk(deskId, deskLabel) {
    let requestBody = {
        "id": deskId,
        "label" : deskLabel
    }

    $.ajax({
        url: API.DESK + "/update",
        type: 'PUT',
        data: JSON.stringify(requestBody),
        contentType: 'application/json',
        success: function(data) {
            $(`tr[data-desk-id="${deskId}"] .desk-table-label`).text(deskLabel);
            $(`tr[data-desk-id="${deskId}"]`).data("desk-label", deskLabel);
            destroyModalDialogs()
        },
        error : function (data) {
            alert(data.message);
        }
    });

}

/**
 * Make API request and delete the desk
 * @param deskId
 */
function deleteDesk(deskId) {
    $.ajax({
        url: API.DESK + `/delete/${deskId}`,
        type: 'DELETE',
        contentType: 'application/json',
        success: function(data) {
            // Delete category from UI
            $(`tr[data-desk-id="${deskId}"]`).remove();
            destroyModalDialogs();
        }
    });
}

/**
 * New desk action, show new desk dialog
 */
function actionNewDesk() {
    showModalDialog("Create new desk", `
        <div class="form-row">
            <div class="col-3">
                <label class="font-weight-bold">Desk label:</label>
            </div>
            <div class="col-9">
                <input id="input-desk-label" type="text" class="form-control" placeholder="Enter desk label">
                <div class="invalid-feedback">Desk label can't be empty</div>
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
                let inputDeskLabel = $("#input-desk-label");

                if (!inputDeskLabel.val()) {
                    // Check if input is empty
                    inputDeskLabel.addClass("is-invalid");
                } else {
                    createNewDesk(inputDeskLabel.val());
                    destroyModalDialogs();
                }
            }
        }
    );
}

/**
 * Edit desk action. show edit dialog
 * @param deskId
 */
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
                let inputDeskLabel = $("#input-desk-label").val();
                updateDesk(deskId, inputDeskLabel);
            }
        }
    );
}

/**
 * Delete desk action, show delete dialog
 * @param deskId
 */
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
                deleteDesk(deskId);
            }
        }
    );
}

/**
 * Get code action, show qr code dialog
 * @param deskId
 */
function actionGetCode(deskId) {
    let deskRowData = $(`tr[data-desk-id=${deskId}]`).data();
    let deskName = deskRowData.deskLabel;
    let deskCode = deskRowData.deskCode;


    showModalDialog("QR Code", `
       <div id="qrcode-container-${deskId}" class="qrcode-container">
            <div class="qrcode-label">${deskName}</div>
            <div class="qrcode" id="qcode-${deskId}"></div>       
       </div>
           
    `, {
            label: "Refresh code",
            class: "btn-danger",
            onClick: function () {
                // Refresh desk code
                $.ajax({
                    url: API.DESK + "/update/" + deskId,
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (data) {
                        let deskCode = data.deskCode
                        let deskMenuUrl = WEB_ROOT + "menu.php?code=" + deskCode;
                        $(`#qcode-${deskId}`).html("");
                        new QRCode(document.getElementById(`qcode-${deskId}`), deskMenuUrl);
                    }
                })
            }
        },{
            label: "Print",
            class: "btn-secondary",
            onClick: function () {
                showPrintWindow(`qrcode-container-${deskId}`);
            }
        }
    );
    let deskMenuUrl = WEB_ROOT + "menu.php?code=" + deskCode;
    new QRCode(document.getElementById(`qcode-${deskId}`), deskMenuUrl);
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