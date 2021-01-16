<?php
    require_once "inc/model/session.php";
    $session_data = load_session();
    $username = "username";
    if ($session_data) $username = $session_data->username;
?>
<nav class="sb-topnav navbar navbar-expand navbar-dark bg-danger">
    <a class="navbar-brand" href="dashboard.php">QR Menu</a>
    <button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"><i class="fas fa-bars"></i>
    </button>
    <!-- Nav Bar-->
    <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false"><i class="fas fa-user fa-fw"></i> <?php echo $username ?></a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                <a class="dropdown-item" href="edit-staff.php">Edit Personnel</a>
                <a class="dropdown-item" href="edit-menu.php">Edit Menu</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="login.html">Logout</a>
            </div>
        </li>
    </ul>
</nav>