<?php
    require_once "inc/model/session.php";
    $session_data = load_session();
    $username = $session_data->username;
    $is_admin = boolval($session_data->admin);

?>
<nav class="sb-topnav navbar navbar-expand navbar-dark bg-danger">
    <a class="navbar-brand" href="dashboard.php">QR Menu</a>
    <button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle"><i class="fas fa-bars"></i>
    </button>
    <!-- Nav Bar-->
    <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false"><i class="fas fa-user fa-fw"></i> <?php echo $username ?></a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                <?php
                if ($is_admin) echo `
                <a class="dropdown-item" href="edit-staff.php">Edit Personnel</a>
                <a class="dropdown-item" href="edit-menu.php">Edit Menu</a>`;
                ?>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="logout.php">Logout</a>
            </div>
        </li>
    </ul>
</nav>