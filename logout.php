<?php
require_once "inc/model/session.php";
destroy_session();
header("Location: login.php");