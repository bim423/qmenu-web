$(document).ready(function () {
   // TODO: Add spinner
    $.get(API.MENU, function( data ) {
        console.log(data.menu)
        if (data.menu) {
            for (let i = 0; i < data.menu.length; i++) {
                let subMenu = data.menu[i];
                addCategory(subMenu.id, subMenu.category, subMenu.description);

                let products = subMenu.products;
                for (let j = 0; j < products.length; j++) {
                    let product = products[j];
                    addProduct(subMenu.id, product.id, product.name, product.description, product.price);
                }
            }
        }
    });
    
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
                    <div class="invalid-feedback">
                      Category name can't be empty
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="col">
                    <label>Description:</label>
                </div>
                <div class="col">
                    <input id="input_category_description" type="text" class="form-control" placeholder="Description">
                    <div class="invalid-feedback">
                      Description can't be empty
                    </div>
                </div>
            </div>
            <div class="form-row btn-row">
                <button id="btn_cancel_category" type="button" class="btn btn-danger">Cancel</button>
                <button id="btn_add_category" type="button" class="btn btn-success">Add</button>
            </div>
        </div>`
        );

        $("#btn_add_category").click(function () {
            let inputCategoryName = $("#input_category_name");
            let inputCategoryDescription = $("#input_category_description");

            if (!inputCategoryName.val()) inputCategoryName.addClass("is-invalid");
            else inputCategoryName.removeClass("is-invalid");

            if (!inputCategoryDescription.val()) inputCategoryDescription.addClass("is-invalid");
            else inputCategoryDescription.removeClass("is-invalid");

            if (inputCategoryName.val() && inputCategoryDescription.val()) {
                createNewCategory(inputCategoryName.val(), inputCategoryDescription.val());
            }
        });

        $("#btn_cancel_category").click(function () {
            setNewCategoryFormVisible(false);
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
                    <div class="invalid-feedback">Product name can't be empty</div>
                </div>
                <div class="col-2">
                    <label>Price:</label>
                </div>
                <div class="col-2">
                    <input id="input-product-price-${categoryId}" type="number"  step="0.05" class="form-control" placeholder="Price">
                    <div id="price-invalid-feedback-${categoryId}" class="invalid-feedback">Product price can't be empty</div>
                </div>
            </div>
            <div class="form-row">
                <div class="col-3">
                    <label>Description:</label>
                </div>
                <div class="col-5">
                    <input id="input-product-description-${categoryId}" type="text" class="form-control" placeholder="Description">
                    <div class="invalid-feedback">Product description can't be empty</div>
                </div>
            </div>
            <div class="form-row btn-row">
                <button id="btn-cancel-product-${categoryId}" type="button" class="btn btn-danger">Cancel</button>
                <button id="btn-add-product-${categoryId}" type="button" class="btn btn-success">Add</button>
            </div>
        </div>`
        );

        $("#btn-add-product-" + categoryId).click(function () {
            console.log("Add product to: " + categoryId);
            let inputProductName = $(`#input-product-name-${categoryId}`);
            let inputProductDescription = $(`#input-product-description-${categoryId}`);
            let inputPrice = $(`#input-product-price-${categoryId}`);
            let priceInvalidFeedback = $(`#price-invalid-feedback-${categoryId}`);
            let inputValid = true;

            let productName = inputProductName.val();
            let productDescription = inputProductDescription.val();
            let price = inputPrice.val();

            // Validate product name
            if (!productName) {
                inputValid = false;
                inputProductName.addClass("is-invalid");
            } else {
                inputProductName.removeClass("is-invalid");
            }

            // Validate product description
            if (!productDescription) {
                inputValid = false;
                inputProductDescription.addClass("is-invalid");
            } else {
                inputProductDescription.removeClass("is-invalid");
            }

            // Validate product price
            if (!price) {
                inputValid = false;
                inputPrice.addClass("is-invalid");
            }
            else if (!Number(price)) {
                inputValid = false;
                inputPrice.addClass("is-invalid");
                priceInvalidFeedback.text("PLease enter a valid number for price")
            }
            else {
                inputPrice.removeClass("is-invalid");
            }

            // Send request if input is valid
            if (inputValid) createNewProduct(categoryId, productName, productDescription, price)
        });

        $("#btn-cancel-product-" + categoryId).click(function () {
            console.log("Cancel product on: " + categoryId);
            setNewProductFormVisible(categoryId, false);
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
                    <div class="invalid-feedback">Category name can't be empty </div>
                </div>
            </div>
            <div class="form-row">
                <div class="col">
                    <label>Description:</label>
                </div>
                <div class="col">
                    <input id="input-category-description" type="text" class="form-control" placeholder="Description" value="${originalCategoryDesc}">
                    <div class="invalid-feedback">Category name can't be empty </div>
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
        // Get user input
        let inputCategoryName = $(`#category-${categoryId} #input-category-name`);
        let inputCategoryDescription = $(`#category-${categoryId} #input-category-description`);
        let categoryName = inputCategoryName.val();
        let categoryDescription = inputCategoryDescription.val();

        // Validate inputs
        if (!categoryName) inputCategoryName.addClass("is-invalid");
        else inputCategoryName.removeClass("is-invalid");

        if (!categoryDescription) inputCategoryDescription.addClass("is-invalid");
        else inputCategoryDescription.removeClass("is-invalid");

        if (categoryName && categoryDescription) {
            $(`#category-${categoryId} .col-category-info`).show();
            $(`#category-${categoryId} .col-category-actions`).show();
            updateCategory(categoryId, categoryName, categoryDescription);
            $(`#category-${categoryId} .category-form`).remove();
        }
    });

    $(`#category-${categoryId} .category-card-header #btn-cancel-category`).click(function () {
        $(`#category-${categoryId} .col-category-info`).show();
        $(`#category-${categoryId} .col-category-actions`).show();
        $(`#category-${categoryId} .category-form`).remove();
    });

    $(`#category-${categoryId} .category-card-header #btn-delete-category`).click(function () {
        deleteCategory(categoryId)
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
    $(`#product-container-${productId}`).append(`
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
                    <input id="input-product-price" type="number" step="0.1" class="form-control" placeholder="Price" value="${originalProductPrice}">
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

    $(`#product-container-${productId} #btn-edit-product`).click(function () {
        // Get user inputs
        let inputProductName = $(`#product-container-${productId} #input-product-name`);
        let inputProductDesc = $(`#product-container-${productId} #input-product-description`);
        let inputProductPrice = $(`#product-container-${productId} #input-product-price`);

        let productName = inputProductName.val();
        let productDesc = inputProductDesc.val();
        let productPrice = inputProductPrice.val();
        let inputValid = true;

        // Validate product name
        if (!productName) {
            inputValid = false;
            inputProductName.addClass("is-invalid");
        } else {
            inputProductName.removeClass("is-invalid");
        }

        // Validate product description
        if (!productDesc) {
            inputValid = false;
            inputProductDesc.addClass("is-invalid");
        } else {
            inputProductDesc.removeClass("is-invalid");
        }

        // Validate product price
        if (!productPrice) {
            inputValid = false;
            inputProductPrice.addClass("is-invalid");
        }
        else if (!Number(productPrice)) {
            inputValid = false;
            inputProductPrice.addClass("is-invalid");
        }
        else {
            inputProductPrice.removeClass("is-invalid");
        }

        if (inputValid) updateProduct(productId, productName, productDesc, productPrice);
    });

    $(`#product-container-${productId} #btn-cancel-product`).click(function () {
        // Cancel event, do not do anything
        $(`#product-container-${productId} .col-product-info`).show();
        $(`#product-container-${productId} .col-product-price`).show();
        $(`#edit-product-form-${productId}`).remove();
    });

    $(`#product-container-${productId} #btn-delete-product`).click(function () {
        // Delete product
        deleteProduct(productId);
    });
}

/**
 * Adds category to the UI.
 * @param categoryId
 * @param categoryName
 * @param categoryDescription
 */
function addCategory(categoryId, categoryName, categoryDescription) {
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

    // Set up events
    $("#btn-add-category-product-" + categoryId).click(function () {
        console.log(categoryId);
        setNewProductFormVisible(categoryId, true);
    })
    $("#btn-edit-category-" + categoryId).click(function () {
        console.log(categoryId);
        showEditCategoryForm(categoryId);
    })

    setNewCategoryFormVisible(false)

}

/**
 * Updates category card header in UI
 * @param categoryId
 * @param categoryName
 * @param categoryDescription
 */
function updateCategoryContainer(categoryId, categoryName, categoryDescription) {
    let categoryNameLabel = $("#category-info-" + categoryId);
    categoryNameLabel.replaceWith(`
        <div class="col-category-info" id="category-info-${categoryId}">
            <h2 class="category-name" id="category-name-${categoryId}">${categoryName}</h2>
            <p class="category-description" id="category-description-${categoryId}">${categoryDescription}</p>
        </div>
    `);
}

/**
 * Adds product to the category card on the UI
 * @param categoryId
 * @param productId
 * @param productName
 * @param productDescription
 * @param price
 */
function addProduct(categoryId, productId, productName, productDescription, price) {
    let productListContainer = $("#product-list-" + categoryId);
    price = Number(price).toFixed(2);
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
}

/**
 * Updates product container on the UI
 * @param productId
 * @param productName
 * @param productDescription
 * @param price
 */
function updateProductContainer(productId, productName, productDescription, price) {
    // Update fields
    $(`#product-container-${productId} .col-product-info .product-name`).text(productName);
    $(`#product-container-${productId} .col-product-info .product-description`).text(productDescription);
    $(`#product-container-${productId} .col-product-price .product-price`).text(`$ ${Number(price).toFixed(2)}`);

    // Replace content
    $(`#product-container-${productId} .col-product-info`).show();
    $(`#product-container-${productId} .col-product-price`).show();
    $(`#edit-product-form-${productId}`).remove();
}

/** API CRUD **/
function createNewCategory(categoryName, categoryDescription) {
    // TODO: Make API request
    let requestBody = {
        "category": categoryName,
        "description": categoryDescription
    }

    $.ajax({
        url: API.SUBMENU + "/create",
        type: 'PUT',
        data: JSON.stringify(requestBody),
        contentType: 'application/json',
        success: function(data) {
            // Append category to the category list
            let categoryId = data.id;
            addCategory(categoryId, categoryName, categoryDescription);
        },
        error : function (data) {
            alert(data.message);
        }
    });
}

function createNewProduct(categoryId, productName, productDescription, price) {
    let requestBody = {
        "name": productName,
        "description": productDescription,
        "price": price,
        "subId": categoryId
    }

    $.ajax({
        url: API.PRODUCT + "/create",
        type: 'PUT',
        data: JSON.stringify(requestBody),
        contentType: 'application/json',
        success: function (data) {
            addProduct(categoryId, data.id, productName, productDescription, price);
        }
    });

}

function deleteCategory(categoryId) {
    // TODO: Add spinner
    $.ajax({
        url: API.SUBMENU + `/${categoryId}`,
        type: 'DELETE',
        contentType: 'application/json',
        success: function(data) {
            // Delete category from UI
            $("#category-" + categoryId).remove();
        }
    });
}

function deleteProduct(productId) {
    // TODO: Add spinner
    $.ajax({
        url: API.PRODUCT,
        type: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify({id : productId}),
        success: function(data) {
            // Delete category from UI
            $(`#product-container-${productId}`).remove();
        }
    });
}

function updateCategory(categoryId, categoryName, categoryDescription) {
    let requestBody = {
        "id" : categoryId,
        "category": categoryName,
        "description": categoryDescription
    }

    $.ajax({
        url: API.SUBMENU + "/update",
        type: 'PUT',
        data: JSON.stringify(requestBody),
        contentType: 'application/json',
        success: function(data) {
            // Append category to the category list
            let categoryId = data.id;
            updateCategoryContainer(categoryId, categoryName, categoryDescription);
        }
    });
}

function updateProduct(productId, productName, productDescription, price) {
    let requestBody = {
        "id" : productId,
        "name": productName,
        "description": productDescription,
        "price" : price
    }

    $.ajax({
        url: API.PRODUCT + "/update",
        type: 'PUT',
        data: JSON.stringify(requestBody),
        contentType: 'application/json',
        success: function(data) {
            // Append category to the category list
            let categoryId = data.id;
            updateProductContainer(productId, productName, productDescription, price);
        }
    });
}
