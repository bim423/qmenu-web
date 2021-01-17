<?php
require_once "inc/model/session.php";
auth_pass();
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Order Terminal - QR Menu</title>
        <link href="css/styles.css" rel="stylesheet" />
        <link href="css/custom.css" rel="stylesheet" />
        <link href="css/order-terminal.css" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js" crossorigin="anonymous"></script>
    </head>
    <body class="sb-nav-fixed">
        <?php include "inc/nav.php"?>

        <div id="layoutSidenav">
            <?php include "inc/sidebar.php"?>
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid">
                        <h1 class="mt-4">Order Terminal</h1>
                        <div class="order-terminal-container">
                            <div id="order-terminal">
                                <!-- Pending Orders -->
                                <div id="pending-orders"></div>
                                <!-- Processing Orders -->
                                <div id="processing-orders"></div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        <script src="js/vendor/jquery.min.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script src="js/api.js"></script>
        <script src="js/controller/order-terminal.js"></script>
        <script src="js/scripts.js"></script>
    </body>
</html>
