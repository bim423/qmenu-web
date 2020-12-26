<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Edit Staff - QR Menu</title>
    <link href="css/styles.css" rel="stylesheet" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js" crossorigin="anonymous"></script>
</head>
<body class="sb-nav-fixed">
<?php include "inc/nav.php"?>

<div id="layoutSidenav">
    <?php include "inc/sidebar.php"?>
    <div id="layoutSidenav_content">
        <main>
            <div class="container-fluid">
                <h1 class="my-4">Staff</h1>
                    <div class="container-fluid">
                        <div class="card">
                            <div class="card-header d-flex">
                                <div class="p-2 ">Showing 2 total personal accounts</div>
                                <div class="p-2 ml-auto">
                                    <button style="float: right" type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                        Create new personal
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <table class="table table-hover">
                                    <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Firstname</th>
                                        <th>Lastname</th>
                                        <th>E-mail</th>
                                        <th>Role</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>John</td>
                                        <td>Doe</td>
                                        <td>john@example.com</td>
                                        <td>mary@example.com</td>
                                        <td>mary@example.com</td>
                                    </tr>
                                    <tr>
                                        <td>Mary</td>
                                        <td>Moe</td>
                                        <td>mary@example.com</td>
                                        <td>mary@example.com</td>
                                        <td>mary@example.com</td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>    <!-- Button to Open the Modal -->


                    <!-- The Modal -->
                    <div class="modal" id="myModal">
                        <div class="modal-dialog">
                            <div class="modal-content">

                                <!-- Modal Header -->
                                <div class="modal-header" style="background-color: rgba(0,0,0,.03)">
                                    <h4 class="modal-title" >Create new personal</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>

                                <!-- Modal body -->
                                <div class="modal-body">
                                    <table class="table table-borderless">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <h4>Username :</h4>
                                            </td>
                                            <td>
                                                <div class="input-group mb-3">
                                                    <label>
                                                        <input type="text" placeholder="Username" class="form-control">
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4>Firstname :</h4>
                                            </td>
                                            <td>
                                                <div class="input-group mb-3">
                                                    <label>
                                                        <input type="text" placeholder="Firstname" class="form-control">
                                                    </label>
                                                </div>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4>Lastname :</h4>
                                            </td>
                                            <td>
                                                <div class="input-group mb-3">
                                                    <label>
                                                        <input type="text" placeholder="Lastname" class="form-control">
                                                    </label>
                                                </div>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4>E-mail :</h4>
                                            </td>
                                            <td>
                                                <div class="input-group mb-3">
                                                    <label>
                                                        <input type="text" placeholder="E-mail" class="form-control">
                                                    </label>
                                                </div>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4>Role :</h4>
                                            </td>
                                            <td>
                                                <div class="input-group mb-3">
                                                    <label>
                                                        <input type="text" placeholder="Role" class="form-control">
                                                    </label>
                                                </div>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4>Administration :</h4>
                                            </td>
                                            <td>
                                                <div class="form-check-inline">
                                                    <label class="form-check-label">
                                                        <input type="radio" class="form-check-input" value="" >Grand administration rights
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>

                                    </table>
                                </div>

                                <!-- Modal footer -->
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-success" data-dismiss="modal">Create</button>
                                </div>

                            </div>
                        </div>
                    </div>



            </div>
        </main>
        <?php include "inc/footer.php"?>
    </div>
</div>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" crossorigin="anonymous"></script>

<script src="assets/demo/datatables-demo.js"></script>
<script src="js/scripts.js"></script>
</body>
</html>
