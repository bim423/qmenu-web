$(document).ready(function (){
    var i = 0;
    var t = 0;
    var category_products = [];

    $("#btn_new_category").click(function (){
        //TODO: Show category add form
        $("#editor").append(`
            <div class="card category_form_card">
                <div class="form-row">
                    <div class="col">
                        <label>Category name:</label>
                    </div>
                    <div class="col">
                        <input id="input_category_name_${i}" type="text" class="form-control" placeholder="Category name">
                    </div>
                </div>
                <div class="form-row">
                    <div class="col">
                        <label>Description:</label>
                    </div>
                    <div class="col">
                        <input id="input_category_description_${i}" type="text" class="form-control" placeholder="Description">
                    </div>
                </div>
                <div class="form-row btn-row">
                    <button id="btn_add_category_${i}" type="button" class="btn btn-danger">Cancel</button>
                    <button id="btn_cancel_category_${i}" type="button" class="btn btn-success">Add</button>
                </div>
            </div>
        `);

        /*
        $("#editor").append("<div class=\"editor-container\" id='category_form'>\n" +
            "    <label><b>Category Name</b></label>\n" +
            "    <input type=\"text\" width=\"100%\" id='category_name_input"+i+"'>\n" +
            "    <label><b>Description</b></label>\n" +
            "    <input type=\"text\" width=\"100%\" id='category_description_input"+i+"'>\n" +
            "    <button id='category_cancel_button"+i+"' class=\"button cancel_button remove_button\"><b>Cancel</b></button>\n" +
            "    <button id='category_add_button"+i+"' data-id='" + i + "' class=\"button add_button\"><b>Add</b></button>\n" +
            "</div>");
        */
        $("#btn_add_category"+i).click(function (){
            var data_id = $( this ).attr("data-id");
            var category_input = $("#category_name_input"+data_id).val();
            var category_description_input = $("#category_description_input"+data_id).val();
            $("#category_form").remove();
            $("#main").append("<div id='category_card"+i+"' class=\"category_card\">\n" +
                "    <div>\n" +
                "        <div class=\"flex_card\">\n" +
                "            <label id=\"category_name_label\" ><h3>"+category_input+"</h3></label>\n" +
                "                <div class=\"button_bar\">\n" +
                "                    <div class=\"button_bar_inside\">\n" +
                "                        <button id='category_edit"+i+"' class=\"small_button\"> Edit </button>\n" +
                "                        <button data-id='" + i + "' class=\"small_button add_product\"> + </button>\n" +
                "                        <button data-id='" + i + "' class=\"small_button delete_category\" > - </button>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "        </div>\n" +
                "        <div >\n" +
                "            <label id=\"category_description_label\" ><h5>"+category_description_input+"</h5></label>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "\n" +
                "\n" +
                "    <div id='product_div"+i+"'>\n" +
                "        <p id='product_empty"+i+"'>This category does not have any products. Press plus button to add new product.</p>\n" +
                "    </div>\n" +
                "</div>");
            category_products[i] = 0;
            i++;

        });
        $(document).on('click','#category_cancel_button'+i,function (){
            $("#category_form").remove();
        });

    });
    $(document).on('click','.add_product',function (){
        var data_id = $(this).attr('data-id');

        $("#product_div" + data_id).append("<div class=\"editor-container\" id='product_form" + data_id + "'>\n" +
            "        <label>Name</label>\n" +
            "        <input id='product_name" + data_id + "' type=\"text\"  >\n" +
            "        <label>Description</label>\n" +
            "        <input type=\"text\" id='product_description" + data_id + "'>\n" +
            "        <label>Price</label>\n" +
            "        <input type=\"number\" id='price" + data_id + "'>\n" +
            "        <button id='product_cancel_button' class=\"button cancel_button\">Cancel</button>\n" +
            "        <button id='product_add_button' data_id='" + data_id +"' class=\"button add_button\">Add</button>\n" +
            "    </div>");
    });
    $(document).on('click','#product_add_button',function (){
        var data_id= $(this).attr('data_id');
        var product_name =$("#product_name" + data_id).val();
        var product_description = $("#product_description" + data_id).val();
        var price = $("#price" + data_id).val();

        var category_product_id = data_id + "_" + category_products[i];

        $("#product_form" + data_id).remove();
        $("#product_empty" + data_id).remove();
        $("#product_div" + data_id).append("<div id=\"products_card" + category_product_id + "\" class=\"products_card\">\n" +
            "        <div class=\"flex_card\">\n" +
            "            <label class=\"product_name_label\">"+product_name+"</label>\n" +
            "            <div class='button_bar'><div class='button_bar_inside'>" +
            "            <button data-id='" + category_product_id + "' class=\"w3-btn trash\"><i class=\"fa fa-trash\"></i></button>"+
            "              </div></div>"+
            "        </div>\n" +
            "        <div>\n" +
            "            <label class=\"product_description_label\">" + product_description + "</label>\n" +
            "            <label class=\"price_label\"> " + price + " TL</label>\n" +
            "        </div>\n" +
            "    </div>");
    });

    $(document).on('click','#product_cancel_button',function (){
        ($(this).attr('id'));
        $("#product_form"+t).remove();
    });
    $(document).on('click','.delete_category',function (){
        var data_id = $(this).attr('data-id');
        var r = confirm("emin misiniz?")

        if (r === true){
            $("#category_card" + data_id).remove();
        };
    })
    $(document).on('click','.trash',function (){
        var data_id = $(this).attr('data-id');
        var r = confirm("emin misiniz?")

        if (r === true){
            $("#products_card" + data_id).remove();
        };
    })
});

/** Make API request and add category to the UI**/
function addNewCategory() {

}