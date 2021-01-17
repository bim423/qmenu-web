<?php
    // Load session data
    require_once "inc/model/session.php";
    $session_data = load_session();
    $is_admin = boolval($session_data->admin);
?>
<div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
        <div class="sb-sidenav-menu">
            <div class="nav">
<?php
                    if ($is_admin) {
                        echo <<<HTML
                        <div class="sb-sidenav-menu-heading">Core</div>
                        <a class="nav-link" href="dashboard.php">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            Dashboard
                        </a>

                        <div class="sb-sidenav-menu-heading">Restaurant</div>
                        <a class="nav-link" href="edit-desks.php">
                            <div class="sb-nav-link-icon"><i class="fas fa-th"></i></div>
                            Desks
                        </a>
                        <a class="nav-link" href="edit-menu.php">
                            <div class="sb-nav-link-icon"><i class="fas fa-utensils"></i></div>
                            Edit Menu
                        </a>
HTML;
                    }
?>
                <!-- Common options -->
                <div class="sb-sidenav-menu-heading">Orders</div>
                <a class="nav-link" href="order-terminal.php">
                    <div class="sb-nav-link-icon"><i class="fas fa-check"></i></div>
                    Order Terminal
                </a>
                <a class="nav-link" href="order-history.php">
                    <div class="sb-nav-link-icon"><i class="fas fa-history"></i></div>
                    Order History
                </a>

<?php
                if ($is_admin) {
                    echo <<< HTML
                        <div class="sb-sidenav-menu-heading">Staff</div>
                        <a class="nav-link" href="edit-staff.php">
                            <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                            Edit staff
                        </a>
HTML;
                }
?>

            </div>
        </div>
    </nav>
</div>