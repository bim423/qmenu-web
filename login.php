<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Login - QR Menu</title>
        <link href="css/styles.css" rel="stylesheet" />
        <link rel="stylesheet" href="css/custom.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js" crossorigin="anonymous"></script>
    </head>

    <body class="bg-login">

        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <div class="card mt-5" style="top: 40%;">
                        <div class="card-header"><h3 class="text-center my-2">QRMenu - Login</h3></div>
                        <div class="card-body">
                            <div id="login-alert-container"></div>
                            <form>
                                <div class="form-group">
                                    <label class="mb-1" for="inputUsername">Username</label>
                                    <input class="form-control" id="inputUsername" type="email" placeholder="Enter username" />
                                </div>
                                <div class="form-group">
                                    <label class="mb-1" for="inputPassword">Password</label>
                                    <input class="form-control" id="inputPassword" type="password" placeholder="Enter password" />
                                </div>
                                <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                    <a id="btn-login" class="btn btn-danger raised btn-block">Login</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <footer class="py-4 mt-auto" style="background: rgba(255,255,255,0.5); width:100%; position: absolute; bottom: 0">
            <div class="container-fluid">
                <div class="d-flex align-items-center justify-content-center">
                    <div class="text-muted">BIM423 - Group 8</div>
                </div>
            </div>
        </footer>
    </body>
    <script src="js/vendor/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="js/scripts.js"></script>
    <script src="js/addons/js.cookie-2.2.1.min.js"></script>
    <script src="js/api.js"></script>
    <script src="js/controller/login.js"></script>
</html>
