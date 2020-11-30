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
                <h1 class="my-4">Dashboard</h1>

                <div class="row">
                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-success text-white mb-4 raised stat-card">
                            <div class="card-body">Daily Revenue</div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-primary text-white mb-4 raised stat-card">
                            <div class="card-body">Daily Orders</div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-success text-white mb-4 raised stat-card">
                            <div class="card-body">Monthly Revenue</div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-primary text-white mb-4 raised stat-card">
                            <div class="card-body">Monthly Orders</div>
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

                    <div class="card mb-4">
                        <div class="card-header">
                            <svg class="svg-inline--fa fa-table fa-w-16 mr-1" aria-hidden="true" focusable="false"
                                 data-prefix="fas" data-icon="table" role="img" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 512 512" data-fa-i2svg="">
                                <path fill="currentColor"
                                      d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 416H64v-96h160v96zm0-160H64v-96h160v96zm224 160H288v-96h160v96zm0-160H288v-96h160v96z"></path>
                            </svg><!-- <i class="fas fa-table mr-1"></i> Font Awesome fontawesome.com -->
                            Recent Orders
                        </div>

                    </div>
                </div>

            </div>
        </main>

        <?php include "inc/footer.php" ?>
    </div>
</div>
<script src="js/vendor/jquery-3.5.1.slim.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
        crossorigin="anonymous"></script>
<script src="js/scripts.js"></script>
<script src="js/addons/chart.js"></script>
<script src="assets/demo/chart-area-demo.js"></script>
<script src="assets/demo/chart-bar-demo.js"></script>
<script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js" crossorigin="anonymous"></script>
<script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js" crossorigin="anonymous"></script>
<script src="assets/demo/datatables-demo.js"></script>
</body>
</html>
