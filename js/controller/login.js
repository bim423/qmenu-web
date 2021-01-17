$(document).ready(function () {
    $("#btn-login").click(function () {
        let uidInput = $("#inputUsername").val();
        let passInput = $("#inputPassword").val();
        auth(uidInput, passInput);
    });
})

function setAlertBoxContent(className, text) {
    $("#login-alert-container").html(`<div class="alert alert-${className}">${text}</div>`);
}

function auth(uid, pass) {
    let requestBody = {
        "username": uid,
        "password": pass
    }
    $.ajax({
        url: API.AUTH,
        type: 'POST',
        data: JSON.stringify(requestBody),
        contentType: 'application/json',
        success: function (data) {
            setAlertBoxContent("success", data.message);
            Cookies.set("qmenu_session_token", data.user);
            window.open("login.php", "_top")
        },
        error: function (data) {
            let dataObj = JSON.parse(data.responseText)
            setAlertBoxContent("danger", dataObj.message);
        }
    })
}