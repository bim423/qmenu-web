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
        <div class="container" >
            <div class="editor-container" id="editor">
                <div id="category-list-container">
                    <div id="category-9" class="card category-card">
                        <div class="card-header category-card-header">
                            <div class="col-category-info">
                                <h2 class="category-name">Coffee</h2>
                                <p class="category-description">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</p>
                            </div>
                            <div class="col-category-actions">
                                <button class="btn-category-action"><span class="fa fa-edit"></span></button>
                                <button class="btn-category-action"><span class="fa fa-plus"></span></button>
                            </div>
                        </div>

                        <div class="card-body category-card-body">
                            <div class="product-list-container">
                                <div class="product-container">
                                    <div class="col-product-info">
                                        <h3 class="product-name">Filter coffee</h3>
                                        <p class="product-description">Fresh filter coffee</p>
                                    </div>
                                    <div class="col-product-price">
                                        <button class="btn btn-link"><span class="fa fa-edit"></span></button>
                                        <h3 class="product-price">$ 2.50</h3>
                                    </div>
                                </div>
                            </div>

                            <div class="category-form-container"></div>
                        </div>
                    </div>
                </div>

                <div id="new-category-container">
                    <button id="btn-new-category" class="new-category-button">Create New Category</button>
                </div>
            </div>
        </div>
    </div>

</div>
<script src="js/vendor/jquery-3.5.1.slim.js"></script>
<script src="js/controller/edit-menu.js"></script>
</body>
