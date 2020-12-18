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
            <div class="card-header category-card-header">
                <div class="col-category-info" id="category-info-${categoryId}">
                    <h2 class="category-name" id="category-name-${categoryId}">${categoryName}</h2>
                    <p class="category-description" id="category-description-${categoryId}">${categoryDescription}</p>
                </div>
                <div class="col-category-actions">
                    <button id="btn-edit-category-${categoryId}" class="btn-category-action"><span class="fa fa-edit"></span></button>
                    <button id="btn-add-category-product-${categoryId}" class="btn-category-action"><span class="fa fa-plus"></span></button>
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
        editCategory(categoryId,categoryName,categoryDescription);
    })


    showNewCategoryBtn();

    categoryIndex++;
}
function editCategory(categoryId,categoryName,categoryDescription){
    let categoryContainer = $("#category-info-"+categoryId);
    editCategoryButtonHide(categoryId);
    addCategoryProductButtonHide(categoryId);
    categoryContainer.html(`
            <div class="form-row">
                <div class="col">
                    <label>Category name:</label>
                </div>
                <div class="col">
                    <input id="input_category_name" type="text" class="form-control" placeholder="${categoryName}">
                </div>
            </div>
            <div class="form-row">
                <div class="col">
                    <label>Description:</label>
                </div>
                <div class="col">
                    <input id="input_category_description" type="text" class="form-control" placeholder="${categoryDescription}">
                </div>
            </div>
            <div class="form-row btn-row">
                <button id="btn_cancel_category" type="button" class="btn btn-danger">Cancel</button>
                <button id="btn_edit_category" type="button" class="btn btn-success">Edit</button>
            </div>`
    );
    $("#btn_edit_category").click(function (){
        let categoryName = $("#input_category_name").val();
        let categoryDescription = $("#input_category_description").val();
        showEditCategory(categoryId,categoryName,categoryDescription)
    });
    $("#btn_cancel_category").click(function (){
        let categoryName = $("#category-name-"+categoryId).val();
        let categoryDescription = $("#category-description-"+categoryId).val();
        showEditCategory(categoryId,categoryName,categoryDescription);
    });

}
function showEditCategory(categoryId,categoryName,categoryDescription){
    let categoryNameLabel = $("#category-info-"+categoryId);
    editCategoryButtonShow(categoryId);
    addCategoryProductButtonShow(categoryId);
    categoryNameLabel.replaceWith(`
        <div class="col-category-info" id="category-info-${categoryId}">
                    <h2 class="category-name" id="category-name-${categoryId}">${categoryName}</h2>
                    <p class="category-description" id="category-description-${categoryId}">${categoryDescription}</p>
        </div>`
    );
}
function editCategoryButtonHide(categoryId){
    $("#btn-edit-category-"+categoryId).hide();
}
function addCategoryProductButtonHide(categoryId){
    $("#btn-add-category-product-"+categoryId).hide();
}
function editCategoryButtonShow(categoryId){
    $("#btn-edit-category-"+categoryId).show();
}
function addCategoryProductButtonShow(categoryId){
    $("#btn-add-category-product-"+categoryId).show();
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
                    <input id="input-product-price-${categoryId}" type="text" class="form-control" placeholder="Price">
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

    productListContainer.append(`
        <div class="product-container">
            <div class="col-product-info">
                <h3 class="product-name">${productName}</h3>
                <p class="product-description">${productDescription}</p>
            </div>
            <div class="col-product-price">
                <button class="btn btn-link"><span class="fa fa-edit"></span></button>
                <h3 class="product-price">$ ${price}</h3>
            </div>
        </div>
    `);

    setNewProductFormVisible(categoryId, false);
}
