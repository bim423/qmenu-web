let categoryIndex = 0;
let productIndex = 0;

$(document).ready(function () {
    // TODO: Make API request then populate the UI

    $("#btn-new-category").click(function () {
        setNewCategoryFormVisible(true);
    });
})

/**
 * Sets the visibility of the new category form
 * @param visible Set true when the new category form needs to be shown.
 */
function setNewCategoryFormVisible(visible) {
    if (visible) {
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
            setNewCategoryFormVisible(false);;
        })
    }
    else {
        $("#new-category-container").html(`<button id="btn-new-category" class="new-category-button">Create New Category</button>`);
        $("#btn-new-category").click(function () {
            setNewCategoryFormVisible(true);
        });
    }

}

/**
 * Sets the visibility of new product form
 * @param categoryId Id of the category that the form will be shown in.
 * @param visible Needs to be set true if the form needs to be visible
 */
function setNewProductFormVisible(categoryId, visible) {
    let productFormContainer = $("#product-form-container-" + categoryId);

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

        $("#btn-cancel-product-" + categoryId).click(function () {
            console.log("Cancel product on: " + categoryId);
            setNewProductFormVisible(categoryId, false);
        });

        $("#btn-add-product-" + categoryId).click(function () {
            console.log("Add product to: " + categoryId);
            let productName = $(` #input-product-name-${categoryId}`).val();
            let productDescription = $(`#input-product-description-${categoryId}`).val();
            let price = $(`#input-product-price-${categoryId}`).val();

            addNewProduct(categoryId, productName, productDescription, price)
        });

    } else {
        productFormContainer.html("")
    }
}

/**
 * Replaces the category card header with card editor form
 * @param categoryId
 */
function showEditCategoryForm(categoryId) {
    // Get category card header
    let categoryCardHeader = $(`#category-${categoryId} .category-card-header`);

    // Get old data
    let originalCategoryName = $(`#category-${categoryId} .category-name`).text();
    let originalCategoryDesc = $(`#category-${categoryId} .category-description`).text();

    // Hide normal columns
    $(`#category-${categoryId} .col-category-info`).hide();
    $(`#category-${categoryId} .col-category-actions`).hide();

    // Add form content to the header
    categoryCardHeader.append(`
        <div class="category-form">
            <div class="form-row">
                <div class="col">
                    <label>Category name:</label>
                </div>
                <div class="col">
                    <input id="input-category-name" type="text" class="form-control" placeholder="Category Name" value="${originalCategoryName}">
                </div>
            </div>
            <div class="form-row">
                <div class="col">
                    <label>Description:</label>
                </div>
                <div class="col">
                    <input id="input-category-description" type="text" class="form-control" placeholder="Description" value="${originalCategoryDesc}">
                </div>
            </div>
            <div class="form-row btn-row">
                <button id="btn-delete-category" class="btn text-danger float-left"><span class="fa fa-trash"></span></button>
                <button id="btn-cancel-category" type="button" class="btn btn-danger">Cancel</button>
                <button id="btn-edit-category" type="button" class="btn btn-success">Edit</button>
            </div>
        </div>`
    );

    // Set events for form
    $(`#category-${categoryId} .category-card-header #btn-edit-category`).click(function () {
        let categoryName = $(`#category-${categoryId} #input-category-name`).val();
        let categoryDescription = $(`#category-${categoryId} #input-category-description`).val();
        $(`#category-${categoryId} .col-category-info`).show();
        $(`#category-${categoryId} .col-category-actions`).show();
        updateCategory(categoryId, categoryName, categoryDescription)
        $(`#category-${categoryId} .category-form`).remove();
    });

    $(`#category-${categoryId} .category-card-header #btn-cancel-category`).click(function () {
        $(`#category-${categoryId} .col-category-info`).show();
        $(`#category-${categoryId} .col-category-actions`).show();
        $(`#category-${categoryId} .category-form`).remove();
    });

    $(`#category-${categoryId} .category-card-header #btn-delete-category`).click(function () {
        $("#category-" + categoryId).remove();
    });
}

/**
 * Replaces the product container with the product editor form
 * @param categoryId
 * @param productId
 */
function showEditProductForm(categoryId, productId) {
    let originalProductName = $(`#product-container-${productId} .product-name`).text();
    let originalProductDescription = $(`#product-container-${productId} .col-product-info .product-description`).text();
    let originalProductPrice = $(`#product-container-${productId} .col-product-price .product-price`).text();

    $(`#product-container-${productId} .col-product-info`).hide();
    $(`#product-container-${productId} .col-product-price`).hide();
    $("#product-container-" + productId).append(`
        <div id="edit-product-form-${productId}" class="edit-product-form">
            <div class="form-row">
                <div class="col-3">
                    <label>Product name:</label>
                </div>
                <div class="col-5">
                    <input id="input-product-name" type="text" class="form-control" placeholder="Product name" value="${originalProductName}">
                </div>
                <div class="col-2">
                    <label>Price:</label>
                </div>
                <div class="col-2">
                    <input id="input-product-price" type="number" class="form-control" placeholder="Price" value="${originalProductPrice}">
                </div>
            </div>
            <div class="form-row">
                <div class="col-3">
                    <label>Description:</label>
                </div>
                <div class="col-5">
                    <input id="input-product-description" type="text" class="form-control" placeholder="Description" value="${originalProductDescription}">
                </div>
            </div>
            <div class="form-row btn-row">
            <button class="btn text-danger" id="btn-delete-product"><span class="fa fa-trash"></span></button>
                <button id="btn-cancel-product" type="button" class="btn btn-danger">Cancel</button>
                <button id="btn-edit-product" type="button" class="btn btn-success">Edit</button>
            </div>
        </div>`);

    $(`#product-container-${productId} #btn-cancel-product`).click(function () {
        // Cancel event, do not do anything
        $(`#product-container-${productId} .col-product-info`).show();
        $(`#product-container-${productId} .col-product-price`).show();
        $(`#edit-product-form-${productId}`).remove();
    });

    $(`#product-container-${productId} #btn-edit-product`).click(function () {
        // Retrieve user inputs
        let inputProductName = $(`#product-container-${productId} #input-product-name`).val();
        let inputProductDesc = $(`#product-container-${productId} #input-product-description`).val();
        let inputProductPrice = $(`#product-container-${productId} #input-product-price`).val();
        updateProduct(inputProductName, inputProductDesc, inputProductPrice, categoryId, productId);
    });

    $(`#product-container-${productId} #btn-delete-product`).click(function () {
        // Delete product
        $(`#product-container-${productId}`).remove();
    });
}

/**
 * Creates a new category, makes required API request then adds a new category to the UI.
 * @param categoryName
 * @param categoryDescription
 */
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

    $("#btn-add-category-product-" + categoryId).click(function () {
        console.log(categoryId);
        setNewProductFormVisible(categoryId, true);
    })
    $("#btn-edit-category-" + categoryId).click(function () {
        console.log(categoryId);
        showEditCategoryForm(categoryId);
    })

    setNewCategoryFormVisible(false)

    categoryIndex++;
}

/**
 * Updates category card header in UI
 * @param categoryId
 * @param categoryName
 * @param categoryDescription
 */
function updateCategory(categoryId, categoryName, categoryDescription) {
    let categoryNameLabel = $("#category-info-" + categoryId);
    categoryNameLabel.replaceWith(`
        <div class="col-category-info" id="category-info-${categoryId}">
            <h2 class="category-name" id="category-name-${categoryId}">${categoryName}</h2>
            <p class="category-description" id="category-description-${categoryId}">${categoryDescription}</p>
        </div>
    `);
}

function addNewProduct(categoryId, productName, productDescription, price) {
    let productListContainer = $("#product-list-" + categoryId);
    let productId = productIndex;

    productListContainer.append(`
        <div class="product-container" id="product-container-${productId}" data-product-id="${productId}">
            <div class="col-product-info">
                <h3 class="product-name">${productName}</h3>
                <p class="product-description">${productDescription}</p>
            </div>
            <div class="col-product-price">
                <button class="btn btn-link" id="btn-product-edit-${productId}"><span class="fa fa-edit"></span></button>
                <h3 class="product-price">$ ${price}</h3>
            </div>
        </div>
    `);
    $("#btn-product-edit-" + (productId)).click(function () {
        console.log("Edit product to: " + categoryId + productId);
        showEditProductForm(categoryId, productId);
    });

    setNewProductFormVisible(categoryId, false);
    productIndex++;
}

function updateProduct(productName, productDescription, price, categoryId, productId) {
    // Update fields
    $(`#product-container-${productId} .col-product-info .product-name`).text(productName);
    $(`#product-container-${productId} .col-product-info .product-description`).text(productDescription);
    $(`#product-container-${productId} .col-product-price .product-price`).text(`$ ${price}`);

    // Replace content
    $(`#product-container-${productId} .col-product-info`).show();
    $(`#product-container-${productId} .col-product-price`).show();
    $(`#edit-product-form-${productId}`).remove();
}
