<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>
    <title>Dashboard - QR Menu</title>
    <link href="css/styles.css" rel="stylesheet"/>
    <link href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css" rel="stylesheet"
          crossorigin="anonymous"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js"
            crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/custom.css">
</head>
<body class="sb-nav-fixed">

<?php include "inc/nav.php"?>

<div id="layoutSidenav">
    <?php include "inc/sidebar.php"?>

    <div id="layoutSidenav_content">
        <main>
            <div class="container-fluid">
                <h1 class="my-4 text-danger">Dashboard</h1>

                <div class="row">
                    <div class="col-xl-3 col-md-6">
                        <div class="card text-white mb-4 stat-card">
                            <div class="card-body">
                                <h4>Daily Revenue</h4>
                                <h5 id="daily-revenue-label">$23,220</h5>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-6">
                        <div class="card text-white mb-4 stat-card">
                            <div class="card-body">
                                <h4>Orders Today</h4>
                                <h5 id="daily-orders-label">1909</h5>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-6">
                        <div class="card text-white mb-4 stat-card">
                            <div class="card-body">
                                <h4>Monthly Revenue</h4>
                                <h5 id="monthly-revenue-label">$190,213</h5>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-6">
                        <div class="card text-white mb-4 stat-card">
                            <div class="card-body">
                                <h4>Monthly Orders</h4>
                                <h5 id="monthly-orders-label">10213</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xl-6">
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-chart-area mr-1"></i>
                                Orders Today
                            </div>
                            <div class="card-body">
                                <canvas id="myAreaChart" width="100%" height="40"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-chart-bar mr-1"></i>
                                Orders This Month
                            </div>
                            <div class="card-body">
                                <canvas id="myBarChart" width="100%" height="40"></canvas>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Orders Table -->
                    <div class="col-xl-12">
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table mr-1"></i>
                                Recent Orders
                                <span class="float-right"><a href="order-history.php">More</a></span>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive table-recent-orders">
                                    <table class="table">
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>

        <?php include "inc/footer.php" ?>
    </div>
</div>
<script src="js/vendor/jquery.min.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
        crossorigin="anonymous"></script>
<script src="js/scripts.js"></script>
<script src="js/addons/chart.js"></script>
<script src="js/controller/dashboard.js"></script>
<script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js" crossorigin="anonymous"></script>
<script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js" crossorigin="anonymous"></script>
<script src="assets/demo/datatables-demo.js"></script>
<script src="js/api.js"></script>
<script src="js/controller/dashboard.js"></script>
</body>
</html>
