<?php
    header("Access-Control-Allow-Origin: *");
?>
<html lang="en">

<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>
    <title>Edit Menu - QRMenu</title>
    <link href="css/styles.css" rel="stylesheet"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js"
            crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/custom.css">
    <link rel="stylesheet" href="css/menu-editor.css">
</head>
<body class="sb-nav-fixed">
<?php include "inc/nav.php"?>
<div id="layoutSidenav">
    <?php include "inc/sidebar.php"?>

    <div id="layoutSidenav_content">
        <div class="container-fluid" >
            <h1 class="my-4">Edit Menu</h1>
            <div class="row">
                <div class="col-lg-8">
                    <div class="editor-container" id="editor">
                        <div id="category-list-container">

                        </div>
                        <div id="new-category-container">
                            <button id="btn-new-category" class="new-category-button">Create New Category</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</div>
<!--Scripts-->
<script src="js/api.js"></script>
<script src="js/vendor/jquery.min.js"></script>
<script src="js/addons/modals.js"></script>
<script src="js/controller/edit-menu.js"></script>
<script src="js/scripts.js"></script>
</body>
