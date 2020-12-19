<?php
// TODO: Get desks from API
$response = file_get_contents("assets/demo/desk.json");
$response_obj = json_decode($response);
$desks = $response_obj->desks;



function get_desk_editor_table_rows_content($desks){
    $table_rows = "";
    foreach ($desks as $desk) {
        $table_rows .= <<<HTML
        <tr data-desk-id="$desk->desk_id" data-desk-label="$desk->desk_label">
            <th class="desk-table-label" scope="row">$desk->desk_label</th>
            <td class="desk-table-actions">
                <button class="btn-table-action text-primary" data-action="edit"><span class="fa fa-pen"></span></button>
                <button class="btn-table-action text-danger" data-action="delete"><span class="fa fa-trash"></span></button>
                <button class="btn-table-action text-success" data-action="code"><span class="fa fa-qrcode"></span></button>
            </td>
        </tr>
HTML;
    }
    return $table_rows;
}
?>

<html lang="en">

<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>
    <title>Edit Desks - QRMenu</title>
    <link href="css/styles.css" rel="stylesheet"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js"
            crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/custom.css">
    <link rel="stylesheet" href="css/desk-editor.css">
    <link rel="stylesheet" href="css/qrcode.css">
</head>
<body class="sb-nav-fixed">
<?php include "inc/nav.php"?>
<div id="layoutSidenav">
    <?php include "inc/sidebar.php"?>

    <div id="layoutSidenav_content">

        <div class="container-fluid">
            <h1 class="my-4">Edit Desks</h1>
            <div class="row">
                <div class="col-sm-12 col-md-8">
                    <div class="card">
                        <table class="table desk-table">
                            <thead>
                                <tr>
                                    <th scope="col">Desks</th>
                                    <th class="text-right" scope="col"><button class="btn btn-success">New Desk</button></th>
                                </tr>
                            </thead>
                            <tbody>
                            <?php echo get_desk_editor_table_rows_content($desks);?>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-sm-12 col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <span class="fa fa-print"></span> Print QR codes
                        </div>
                        <div class="card-body">
                            <div class="alert alert-info">Place the QR codes to the desks</div>
                            <button class="btn btn-secondary btn-block text-left"><span class="fa fa-print"></span> Print all QR codes</button>
                            <button class="btn btn-danger btn-block text-left"><span class="fa fa-file-pdf"></span> Download as PDF</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<!--Scripts-->
<script src="js/vendor/jquery-3.5.1.slim.js"></script>
<script src="js/scripts.js"></script>
<script src="js/addons/modals.js"></script>
<script src="js/addons/qrcode.min.js"></script>
<script src="js/controller/edit-desks.js"></script>
</body>
