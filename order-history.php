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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js" crossorigin="anonymous"></script>
</head>
<body class="sb-nav-fixed">
<?php include "inc/nav.php"?>

<div id="layoutSidenav">
    <?php include "inc/sidebar.php"?>
    <div id="layoutSidenav_content">
        <main>
            <div class="container-fluid">
                <h1 class="mt-4">Order History</h1>
                <div class="col-xl-12">
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table mr-1"></i>
                            Recent Orders
                        </div>
                        <div class="card-body">
                            <div class="table-responsive table-recent-orders">
                                <table class="table" id="order-history-table">
                                    <tbody>
                                    <tr>
                                        <th>Table</th>
                                        <th>Order</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Total cost</th>
                                    </tr>
                                    <tr data-order-id="1">
                                        <td>A1</td>
                                        <td class="order-detail" data-toggle="tooltip" data-placement="bottom"
                                            title="Turkish Tea 2.5 TL x 2 = 5 TL , Margarita Pizza 40 TL ">
                                            2x Turkish Tea<br>
                                            1x Margarita Pizza
                                        </td>
                                        <td>12.01.2020 <br>
                                        13.30</td>
                                        <td class="text-danger order-status">Pending</td>
                                        <td class="order-cost">$ 45</td>
                                    </tr>
                                    <tr data-order-id="2">
                                        <td>A2</td>
                                        <td class="order-detail" data-toggle="tooltip" data-placement="bottom"
                                            title="Café Americano 20 TL x 2 = 40 TL , Turkish Tea 2.5 TL ">
                                            2x Café Americano<br>
                                            1x Turkish Tea</td>
                                        <td>12.01.2020 <br>
                                            13.45</td>
                                        <td class="text-success order-status">Delivered</td>
                                        <td class="order-cost">$ 45</td>
                                    </tr>
                                    <tr data-order-id="3">
                                        <td>A4</td>
                                        <td class="order-detail" data-toggle="tooltip" data-placement="bottom"
                                            title="Royal Pizza 20 TL , Margarita Pizza 40 TL , Napolitana Pizza 15 TL ">
                                            1x Royal Pizza<br>
                                            1x Margarita Pizza<br>
                                            1x Napolitana Pizza
                                        </td>
                                        <td>12.01.2020 <br>
                                            14.00</td>
                                        <td class="text-warning order-status">Processing</td>
                                        <td class="order-cost">$ 75</td>
                                    </tr>
                                    <tr data-order-id="4">
                                        <td>A5</td>
                                        <td class="order-detail" data-toggle="tooltip" data-placement="bottom"
                                            title="Café Americano 20 TL x 2 = 40 TL ">
                                            2x Café Americano</td>
                                        <td>12.01.2020 <br>
                                            14.15</td>
                                        <td class="text-success order-status">Delivered</td>
                                        <td class="order-cost">$ 15</td>
                                    </tr>
                                    <tr data-order-id="5">
                                        <td>B2</td>
                                        <td class="order-detail" data-toggle="tooltip" data-placement="bottom"
                                            title="Turkish Tea 2.5 TL x 2 = 5 TL ">
                                            2x Turkish Tea<br>
                                        <td>12.01.2020 <br>
                                            14.30</td>
                                        <td class="text-success order-status">Delivered</td>
                                        <td class="order-cost">$ 5</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <?php include "inc/footer.php"?>
    </div>
</div>
<!--Scripts-->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
<script src="js/vendor/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script src="assets/demo/chart-area-demo.js"></script>
<script src="assets/demo/chart-bar-demo.js"></script>
<script src="assets/demo/chart-pie-demo.js"></script>
<script src="js/addons/modals.js"></script>
<script src="js/controller/order-history.js"></script>
<script src="js/scripts.js"></script>
</body>
</html>
