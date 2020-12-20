let categoryIndex = 0;
let productIndex = 0;

$(document).ready(function () {
    $("#btn-new-category").click(function () {
        showCategoryForm();
    });
})

/** Replace new category container with category form **/
function showCategoryForm() {
    $("#new-category-container").html(`
        <div class="card editor-form-card">
            <div class="form-row">
                <div class="col">
                    <label>Category name:</label>
                </div>
                <div class="col">
                    <input id="input_category_name" type="text" class="form-control" placeholder="Category name">
                </div>
            </div>
            <div class="form-row">
                <div class="col">
                    <label>Description:</label>
                </div>
                <div class="col">
                    <input id="input_category_description" type="text" class="form-control" placeholder="Description">
                </div>
            </div>
            <div class="form-row btn-row">
                <button id="btn_cancel_category" type="button" class="btn btn-danger">Cancel</button>
                <button id="btn_add_category" type="button" class="btn btn-success">Add</button>
            </div>
        </div>`
    );

    $("#btn_add_category").click(function () {
        //TODO: Validate input
        let categoryName = $("#input_category_name").val();
        let categoryDescription = $("#input_category_description").val();
        addCategory(categoryName, categoryDescription);

    });

    $("#btn_cancel_category").click(function () {
        showNewCategoryBtn();
    })
}

function showNewCategoryBtn() {
    $("#new-category-container").html(`<button id="btn-new-category" class="new-category-button">Create New Category</button>`);
    $("#btn-new-category").click(function () {
        showCategoryForm();
    });

}

function addCategory(categoryName, categoryDescription) {
    // TODO: Make API request
    // Append category to the category list
    let categoryId = categoryIndex
    $("#category-list-container").append(`
        <div id="category-${categoryId}" class="card category-card">
            <div id="category-header-container-${categoryId}">
                <div class="card-header category-card-header" id="card-header-${categoryId}">
                    <div class="col-category-info" id="category-info-${categoryId}">
                        <h2 class="category-name" id="category-name-${categoryId}">${categoryName}</h2>
                        <p class="category-description" id="category-description-${categoryId}">${categoryDescription}</p>
                    </div>
                    <div class="col-category-actions">
                        <button id="btn-edit-category-${categoryId}" class="btn-category-action"><span class="fa fa-edit"></span></button>
                        <button id="btn-add-category-product-${categoryId}" class="btn-category-action"><span class="fa fa-plus"></span></button>
                    </div>
                </div>
            </div>
            

            <div id="category-card-body-${categoryId}" class="card-body category-card-body">
                <div id="product-list-${categoryId}" class="product-list-container">
                                
                </div>
                
                <div id="product-form-container-${categoryId}">
                
                </div>
            </div>
        </div>   
    `);

    $("#btn-add-category-product-"+categoryId).click(function () {
        console.log(categoryId);
        setNewProductFormVisible(categoryId, true);
    })
    $("#btn-edit-category-"+categoryId).click(function (){
        console.log(categoryId);
        editCategoryForm(categoryId);
    })

    showNewCategoryBtn();

    categoryIndex++;
}
function editCategoryForm(categoryId){
    let categoryContainer = $("#category-header-container-"+categoryId);
    $("#category-info-"+categoryId).hide();
    $("#btn-edit-category-"+categoryId).hide();
    $("#btn-add-category-product-"+categoryId).hide();
    categoryContainer.append(`
            <div class="category-form" id="category-form">
                <div class="form-row">
                    <div class="col">
                        <label>Category name:</label>
                    </div>
                    <div class="col">
                        <input id="input_category_name" type="text" class="form-control" placeholder="Category Name">
                    </div>
                </div>
                <div class="form-row">
                    <div class="col">
                        <label>Description:</label>
                    </div>
                    <div class="col">
                        <input id="input_category_description" type="text" class="form-control" placeholder="Description">
                    </div>
                </div>
                <div class="form-row btn-row">
                    <button class="btn text-danger" id="btn_delete_category"><span class="fa fa-trash"></span></button>
                    <button id="btn_cancel_category" type="button" class="btn btn-danger">Cancel</button>
                    <button id="btn_edit_category" type="button" class="btn btn-success">Edit</button>
                </div>
            </div>`
    );
    $("#btn_edit_category").click(function (){
        let categoryName = $("#input_category_name").val();
        let categoryDescription = $("#input_category_description").val();
        $("#category-info-"+categoryId).show();
        showEditCategory(categoryId,categoryName,categoryDescription)
        $("#category-form").remove();
    });
    $("#btn_cancel_category").click(function (){
        $("#category-info-"+categoryId).show();
        $("#category-form").remove();
        $("#btn-edit-category-"+categoryId).show();
        $("#btn-add-category-product-"+categoryId).show();
    });
    $("#btn_delete_category").click(function (){
        $("#category-"+categoryId).remove();
    });
}
function showEditCategory(categoryId,categoryName,categoryDescription){
    let categoryNameLabel = $("#category-info-"+categoryId);
    $("#btn-edit-category-"+categoryId).show();
    $("#btn-add-category-product-"+categoryId).show();
    categoryNameLabel.replaceWith(`
        <div class="col-category-info" id="category-info-${categoryId}">
                    <h2 class="category-name" id="category-name-${categoryId}">${categoryName}</h2>
                    <p class="category-description" id="category-description-${categoryId}">${categoryDescription}</p>
        </div>`
    );
}

function setNewProductFormVisible(categoryId, visible) {
    let productFormContainer = $("#product-form-container-"+categoryId);

    if (visible) {
        productFormContainer.html(`
        <div id="new-product-form-card-${categoryId}" class="card editor-form-card">
            <div class="form-row">
                <div class="col-3">
                    <label>Product name:</label>
                </div>
                <div class="col-5">
                    <input id="input-product-name-${categoryId}" type="text" class="form-control" placeholder="Product name">
                </div>
                <div class="col-2">
                    <label>Price:</label>
                </div>
                <div class="col-2">
                    <input id="input-product-price-${categoryId}" type="number" class="form-control" placeholder="Price">
                </div>
            </div>
            <div class="form-row">
                <div class="col-3">
                    <label>Description:</label>
                </div>
                <div class="col-5">
                    <input id="input-product-description-${categoryId}" type="text" class="form-control" placeholder="Description">
                </div>
            </div>
            <div class="form-row btn-row">
                <button id="btn-cancel-product-${categoryId}" type="button" class="btn btn-danger">Cancel</button>
                <button id="btn-add-product-${categoryId}" type="button" class="btn btn-success">Add</button>
            </div>
        </div>`
        );

        $("#btn-cancel-product-"+categoryId).click(function () {
            console.log("Cancel product on: " + categoryId);
            setNewProductFormVisible(categoryId, false);
        });

        $("#btn-add-product-"+categoryId).click(function () {
            console.log("Add product to: " + categoryId);
            let productName = $(` #input-product-name-${categoryId}`).val();
            let productDescription = $(`#input-product-description-${categoryId}`).val();
            let price = $(`#input-product-price-${categoryId}`).val();

            addNewProduct(categoryId, productName, productDescription, price)
        });

    }
    else {
        productFormContainer.html("")
    }
}

function addNewProduct(categoryId, productName, productDescription, price) {
    let productListContainer = $("#product-list-"+categoryId);
    let productId = productIndex;

    productListContainer.append(`
        <div class="product-container" id="product-container-${categoryId}${productId}">
            <div class="col-product-info" id="col-product-info-${categoryId}${productId}">
                <h3 class="product-name">${productName}</h3>
                <p class="product-description">${productDescription}</p>
            </div>
            <div class="col-product-price" id="col-product-price-${categoryId}${productId}">
                <button class="btn btn-link" id="btn-product-edit-${categoryId}${productId}"><span class="fa fa-edit"></span></button>
                <h3 class="product-price">$ ${price}</h3>
            </div>
        </div>
    `);
    $("#btn-product-edit-"+categoryId+(productId)).click(function (){
        console.log("Edit product to: " + categoryId + productId);
        editProductForm(categoryId, productId);
    });

    setNewProductFormVisible(categoryId,false);
    productIndex++;
}
function editProductForm(categoryId,productId){
        $("#col-product-info-"+categoryId+productId).hide();
        $("#col-product-price-"+categoryId+productId).hide();
        $("#product-container-"+categoryId+productId).append(`
        <div id="edit-product-form-card-${categoryId}${productId}" class="card editor-form-card">
            <div class="form-row">
                <div class="col-3">
                    <label>Product name:</label>
                </div>
                <div class="col-5">
                    <input id="input-product-name-${categoryId}${productId}" type="text" class="form-control" placeholder="Product name">
                </div>
                <div class="col-2">
                    <label>Price:</label>
                </div>
                <div class="col-2">
                    <input id="input-product-price-${categoryId}${productId}" type="number" class="form-control" placeholder="Price">
                </div>
            </div>
            <div class="form-row">
                <div class="col-3">
                    <label>Description:</label>
                </div>
                <div class="col-5">
                    <input id="input-product-description-${categoryId}${productId}" type="text" class="form-control" placeholder="Description">
                </div>
            </div>
            <div class="form-row btn-row">
            <button class="btn text-danger" id="btn_delete_product_${categoryId}${productId}"><span class="fa fa-trash"></span></button>
                <button id="btn-cancel-product-${categoryId}${productId}" type="button" class="btn btn-danger">Cancel</button>
                <button id="btn-edit-product-${categoryId}${productId}" type="button" class="btn btn-success">Edit</button>
            </div>
        </div>`);
        $("#btn-cancel-product-"+categoryId+productId).click(function (){
            console.log("Cancel form to: " + categoryId + productId);
            $("#col-product-info-"+categoryId+productId).show();
            $("#col-product-price-"+categoryId+productId).show();
            $("#edit-product-form-card-"+categoryId+productId).remove();

        });
        $("#btn-edit-product-"+categoryId+productId).click(function (){
            let productName = $("#input-product-name-"+categoryId+productId).val();
            let productDescription = $("#input-product-description-"+categoryId+productId).val();
            let price = $("#input-product-price-"+categoryId+productId).val();
            showEditProduct(productName,productDescription,price,categoryId,productId);
        });
        $("#btn_delete_product_"+categoryId+productId).click(function (){
            $("#edit-product-form-card-"+categoryId+productId).remove();
            $("#product-container-"+categoryId+productId).remove();
        });
}
function showEditProduct(productName,productDescription,price,categoryId,productId){
    $("#col-product-info-"+categoryId+productId).show();
    $("#col-product-price-"+categoryId+productId).show();
    $("#edit-product-form-card-"+categoryId+productId).remove();
    $("#product-container-"+categoryId+productId).replaceWith(`
        <div class="product-container" id="product-container-${categoryId}${productId}">
            <div class="col-product-info" id="col-product-info-${categoryId}${productId}">
                <h3 class="product-name">${productName}</h3>
                <p class="product-description">${productDescription}</p>
            </div>
            <div class="col-product-price" id="col-product-price-${categoryId}${productId}">
                <button class="btn btn-link" id="btn-product-edit-${categoryId}${productId}"><span class="fa fa-edit"></span></button>
                <h3 class="product-price">$ ${price}</h3>
            </div>
        </div>
    `);
    $("#btn-product-edit-"+categoryId+productId).click(function (){
        console.log("Edit product to: " + categoryId + productId);
        editProductForm(categoryId, productId);
    });
}
