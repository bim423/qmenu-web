<?php
function load_session(){
    if (!isset($_COOKIE["qmenu_session_token"])) return null;

    $session_data = json_decode($_COOKIE["qmenu_session_token"]);
    if (!$session_data) return null;

    return $session_data;
}

function destroy_session() {
    unset($_COOKIE["qmenu_session_token"]);
    setcookie("qmenu_session_token", null, -1, '/');
}

function auth_pass(){
    // Load session data
    $session_data = load_session();
    if (!$session_data) {
        header("Location: login.php?expired=1");
        exit();
    }
}

function admin_pass(){
    // Load session data
    $session_data = load_session();
    if (!$session_data) header("Location: login.php?expired=1");

    // Check privileges
    if (!$session_data->admin) {
        header("Location: order-terminal.php");
        exit();
    }
}