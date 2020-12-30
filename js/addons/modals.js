let modalCount = 0;

$(document).ready(function () {
    window.onclick = function(event) {
        modalCount = $(".modal").length;

        for (let i = 0; i < modalCount; i++) {
            if ($(".modal")[i] === event.target) hideModals();
        }
    };

    $(".modal-close").click(function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        hideModals();
    });
});

function hideModals() {
    $(".modal").hide();
}

function showModalDialog(title, body, ... actions) {
    let modalId = modalCount + 1;
    let footerContent = "";
    for (let i = 0; i < actions.length; i++) {
        footerContent += `<button id="modal-action-btn-${modalId}-${i}" type="button" class="btn ${actions[i].class}">${actions[i].label}</button>`;
        console.log(actions[i]);
    }

    $("body").append(`
    <div class="modal" id="modal-${modalId}">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${title}</h5>
                    <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"><span class="fa fa-times-circle"></span></button>
                </div>
                <div class="modal-body">
                    ${body}
                </div>
                <div class="modal-footer">
                    ${footerContent}
                </div>
            </div>
        </div>
    </div>    
   
    `);

    // SetUp Events
    for (let i = 0; i < actions.length; i++) {
        document.getElementById(`modal-action-btn-${modalId}-${i}`).onclick = actions[i].onClick;
    }

    $(`#modal-${modalId} .btn-close`).click(function () {
        destroyModalDialog(modalId);
    })

    $("#modal-" + modalId).css("opacity", 1);
}

function destroyModalDialog(modalId) {
    $("#modal-"+modalId).remove();
}

function destroyModalDialogs() {
    $(".modal").remove();
}