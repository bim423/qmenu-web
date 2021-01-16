<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Edit Staff - QR Menu</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link href="css/styles.css" rel="stylesheet" />
    <link href="css/custom.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js" crossorigin="anonymous"></script>
</head>
<body class="sb-nav-fixed">
<?php include "inc/nav.php"?>

<div id="layoutSidenav">
    <?php include "inc/sidebar.php"?>
    <div id="layoutSidenav_content">
        <div class="container-fluid">

            <h1 class="my-4">Staff</h1>
            <div class="d-flex flex-row mb-2 align-items-center">
                <div>Showing 2 total personnel accounts</div>
                <button style="margin-left: auto" type="button" class="btn btn-success" id="btn-add-staff">
                    Create new personnel
                </button>
            </div>

            <table class="table table-hover table-bordered" id="personnel-table">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>E-mail</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <?php include "inc/footer.php"?>
    </div>

</div>
<script src="js/scripts.js"></script>
<script src="js/vendor/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script src="js/api.js"></script>
<script src="js/addons/modals.js"></script>
<script src="js/controller/edit-staff.js"></script>

</body>
</html>
