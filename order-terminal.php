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
                                <div id="pending-orders">
                                    <div class="order-container order-container-danger" data-order-id="1">
                                        <div class="order-desk-col">
                                            <div class="order-desk-name">Outdoor-3</div>
                                            <div class="order-arrival-time">25 mins ago</div>
                                        </div>
                                        <div class="order-detail-col">
                                            2x Tea<br>
                                            1x Espresso<br>
                                            1x Americano<br>
                                            1x Cold Brew
                                        </div>
                                        <div class="order-badge-col">
                                            <span class="badge badge-danger">Late</span>
                                            <span class="badge badge-warning">Pending</span>
                                        </div>

                                        <div class="order-action-col">
                                            <button class="btn btn-link order-btn-deny"><span class="fa fa-times"></span></button>
                                            <button class="btn btn-link order-btn-approve"><span class="fa fa-check"></span></button>
                                        </div>
                                    </div>
                                    <div class="order-container order-container-warning" data-order-id="1">
                                        <div class="order-desk-col">
                                            <div class="order-desk-name">A1</div>
                                            <div class="order-arrival-time">7 mins ago</div>
                                        </div>
                                        <div class="order-detail-col">
                                            1x Margarita Pizza<br>
                                            2x Napolitana Pizza
                                        </div>
                                        <div class="order-badge-col">
                                            <span class="badge badge-warning">Pending</span>
                                        </div>

                                        <div class="order-action-col">
                                            <button class="btn btn-link order-btn-deny"><span class="fa fa-times"></span></button>
                                            <button class="btn btn-link order-btn-approve"><span class="fa fa-check"></span></button>
                                        </div>
                                    </div>
                                    <div class="order-container order-container-warning" data-order-id="1">
                                        <div class="order-desk-col">
                                            <div class="order-desk-name">A3</div>
                                            <div class="order-arrival-time">5 mins ago</div>
                                        </div>
                                        <div class="order-detail-col">
                                            2x Black Tea<br>
                                            2x Croissant
                                        </div>
                                        <div class="order-badge-col">
                                            <span class="badge badge-warning">Pending</span>
                                        </div>

                                        <div class="order-action-col">
                                            <button class="btn btn-link order-btn-deny"><span class="fa fa-times"></span></button>
                                            <button class="btn btn-link order-btn-approve"><span class="fa fa-check"></span></button>
                                        </div>
                                    </div>
                                    <div class="order-container order-container-warning" data-order-id="1">
                                        <div class="order-desk-col">
                                            <div class="order-desk-name">A2</div>
                                            <div class="order-arrival-time">1 mins ago</div>
                                        </div>
                                        <div class="order-detail-col">
                                            1x Americano<br>
                                            1x Cold Brew<br>
                                            1x Green Tea<br>
                                            1x Black Tea<br>
                                            2x Croissant
                                        </div>
                                        <div class="order-badge-col">
                                            <span class="badge badge-warning">Pending</span>
                                        </div>

                                        <div class="order-action-col">
                                            <button class="btn btn-link order-btn-deny"><span class="fa fa-times"></span></button>
                                            <button class="btn btn-link order-btn-approve"><span class="fa fa-check"></span></button>
                                        </div>
                                    </div>
                                </div>
                                <!-- Processing Orders -->
                                <div id="processing-orders">
                                    <div class="order-container" data-order-id="1">
                                        <div class="order-desk-col">
                                            <div class="order-desk-name">A1</div>
                                            <div class="order-arrival-time">5 mins ago</div>
                                        </div>
                                        <div class="order-detail-col">
                                            1x Pizza
                                        </div>
                                        <div class="order-badge-col">
                                            <span class="badge badge-success">Processing</span>
                                        </div>

                                        <div class="order-action-col">
                                            <button class="btn btn-link order-btn-revert"><span class="fa fa-undo"></span></button>
                                            <button class="btn btn-link order-btn-deliver"><span class="fa fa-location-arrow"></span></button>
                                        </div>
                                    </div>
                                    <div class="order-container" data-order-id="1">
                                        <div class="order-desk-col">
                                            <div class="order-desk-name">A1</div>
                                            <div class="order-arrival-time">5 mins ago</div>
                                        </div>
                                        <div class="order-detail-col">
                                            1x Pizza
                                        </div>
                                        <div class="order-badge-col">
                                            <span class="badge badge-success">Processing</span>
                                        </div>

                                        <div class="order-action-col">
                                            <button class="btn btn-link order-btn-revert"><span class="fa fa-undo"></span></button>
                                            <button class="btn btn-link order-btn-deliver"><span class="fa fa-location-arrow"></span></button>
                                        </div>
                                    </div>
                                    <div class="order-container" data-order-id="1">
                                        <div class="order-desk-col">
                                            <div class="order-desk-name">A1</div>
                                            <div class="order-arrival-time">5 mins ago</div>
                                        </div>
                                        <div class="order-detail-col">
                                            1x Pizza
                                        </div>
                                        <div class="order-badge-col">
                                            <span class="badge badge-success">Processing</span>
                                        </div>

                                        <div class="order-action-col">
                                            <button class="btn btn-link order-btn-revert"><span class="fa fa-undo"></span></button>
                                            <button class="btn btn-link order-btn-deliver"><span class="fa fa-location-arrow"></span></button>
                                        </div>
                                    </div>
                                    <div class="order-container" data-order-id="1">
                                        <div class="order-desk-col">
                                            <div class="order-desk-name">A1</div>
                                            <div class="order-arrival-time">5 mins ago</div>
                                        </div>
                                        <div class="order-detail-col">
                                            1x Pizza
                                        </div>
                                        <div class="order-badge-col">
                                            <span class="badge badge-success">Processing</span>
                                        </div>

                                        <div class="order-action-col">
                                            <button class="btn btn-link order-btn-revert"><span class="fa fa-undo"></span></button>
                                            <button class="btn btn-link order-btn-deliver"><span class="fa fa-location-arrow"></span></button>
                                        </div>
                                    </div>
                                    <div class="order-container" data-order-id="1">
                                        <div class="order-desk-col">
                                            <div class="order-desk-name">A1</div>
                                            <div class="order-arrival-time">5 mins ago</div>
                                        </div>
                                        <div class="order-detail-col">
                                            1x Pizza
                                        </div>
                                        <div class="order-badge-col">
                                            <span class="badge badge-success">Processing</span>
                                        </div>

                                        <div class="order-action-col">
                                            <button class="btn btn-link order-btn-revert"><span class="fa fa-undo"></span></button>
                                            <button class="btn btn-link order-btn-deliver"><span class="fa fa-location-arrow"></span></button>
                                        </div>
                                    </div>
                                </div>
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
