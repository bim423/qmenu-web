let staffIndex = 3;
let personnel_data;

$(document).ready(function () {
    // Load personnel data
    loadPersonnelData();
})

/**
 * Make API request and load personnel data
 */
function loadPersonnelData() {
    // Get menu from rest API
    $.ajax({
        url: API.PERSONNEL,
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            personnel_data = data;
            // Populate table with the data
            initTable()
        }
    })
}

/**
 * Initialize staff table with personnel data
 */
function initTable() {
    // Initialize create button
    let createStaffButton = $("#btn-add-staff");
    createStaffButton.click(function () {
        showCreatePersonnelDialog()
    })

    // Add rows to the table
    for (let i=0; i<personnel_data.length; i++) {
        let personnel = personnel_data[i];
        let role = (personnel.admin) ? "Admin" : "Personnel";
        addPersonnelRow(personnel.id, personnel.username, personnel.firstName, personnel.lastName, personnel.email, personnel.admin)
    }

    // Add event to the each table row
    $("#personnel-table ").on('click', 'tr', function (e) {
        let target = e.currentTarget;
        console.log(target)
        let staffId = target.dataset.personnelId;
        if (staffId) {
            console.log("Editing personnel " + staffId)
            showEditPersonnelDialog(staffId);
        }
    });
}

/**
 * Returns the personnel with the given ID.
 * @param staffId
 * @returns {*}
 */
function getPersonnelById(staffId) {
    staffId = Number(staffId);
    for (let i=0; i<personnel_data.length; i++) {
        let personnel = personnel_data[i];
        if (personnel.id === staffId)
            return personnel
    }
}

/**
 * Show create new personnel dialog
 */
function showCreatePersonnelDialog() {
    // Show create staff modal
    showModalDialog("Create new personnel",
        `
            <form>
              <div class="form-group">
                <label for="text">Username</label> 
                <input id="input-personnel-username" type="text" placeholder="Username" class="form-control" >
                <div class="invalid-feedback">Username label can't be empty</div>
              </div>
              <div class="form-group">
                <label for="input-personnel-password">Password</label> 
                <input id="input-personnel-password" placeholder="Password" name="input-personnel-password" type="password" class="form-control">
                <div class="invalid-feedback">Password label can't be empty</div>
              </div>
              <div class="form-group">
                <label for="input-personnel-firstname">First Name</label> 
                <input id="input-personnel-firstname" type="text" placeholder="First Name" class="form-control">
                <div class="invalid-feedback">First Name label can't be empty</div>
              </div>
              <div class="form-group">
                <label for="input-personnel-lastname">Last Name</label> 
                <input id="input-personnel-lastname" type="text"  placeholder="Last Name" class="form-control">
                <div class="invalid-feedback">Last Name label can't be empty</div>
              </div>
              <div class="form-group">
                <label for="input-personnel-email">E-Mail</label> 
              <input id="input-personnel-email" placeholder="E-Mail" type="text" class="form-control">
              <div class="invalid-feedback">E-Mail label can't be empty</div>
              </div>
              <div class="form-group">
                <div>
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input name="input-personnel-admin" id="input-personnel-admin_0" type="checkbox" checked="checked" aria-describedby="input-personnel-adminHelpBlock" class="custom-control-input" value="rabbit"> 
                    <label for="input-personnel-admin_0" class="custom-control-label">Grant admin privileges</label>
                  </div> 
                  <span class="form-text text-muted">Check if this user needs to be access to the all functions in the dashboard.</span>
                </div>
              </div> 
            </form>
            `,
        {label: "Cancel", class: "btn-danger", onClick: destroyModalDialogs},
        {
            label: "Create", class: "btn-success", onClick: function () {
                let inputUsername = $("#input-personnel-username").val();
                let inputPassword = $("#input-personnel-password").val();
                let inputFirstName = $("#input-personnel-firstname").val();
                let inputLastName = $("#input-personnel-lastname").val();
                let inputEmail = $("#input-personnel-email").val();
                let inputAdmin = Boolean($("input:checked").is(":checked"));

                let status = validate(inputUsername, inputPassword,
                    inputFirstName, inputLastName, inputEmail);

                 if (status) {
                    createPersonnel(inputUsername, inputPassword, inputFirstName, inputLastName, inputEmail, inputAdmin)
                    staffIndex++;
                }
            }
        }
    )
}

/**
 * Show edit staff modal dialog
 * @param staffId
 */
function showEditPersonnelDialog(staffId) {
    let personnel = getPersonnelById(staffId);
    let username = personnel.username;
    let firstName = personnel.firstName;
    let lastName = personnel.lastName;
    let email = personnel.email;

    // Show edit personnel modal
    showModalDialog("Edit personnel",
        `
            <form>
              <div class="form-group">
                <label for="text">Username</label> 
                <input  id="input-personnel-username" type="text" placeholder="Username" class="form-control" value="${username}">
                <div class="invalid-feedback">Username label can't be empty</div>
              </div>
              <div class="form-group">
                <label for="input-personnel-password">Password</label> 
                <input id="input-personnel-password" placeholder="Password" name="input-personnel-password" type="password" class="form-control">
                <div class="invalid-feedback">Password label can't be empty</div>
              </div>
              <div class="form-group">
                <label for="input-personnel-firstname">First Name</label> 
                <input id="input-personnel-firstname" type="text" placeholder="First Name" value="${firstName}" class="form-control">
                <div class="invalid-feedback">First Name label can't be empty</div>
              </div>
              <div class="form-group">
                <label for="input-personnel-lastname">Last Name</label> 
                <input id="input-personnel-lastname" type="text"  placeholder="Last Name" value="${lastName}" class="form-control">
                <div class="invalid-feedback">Last Name label can't be empty</div>
              </div>
              <div class="form-group">
                <label for="input-personnel-email">E-Mail</label> 
              <input id="input-personnel-email" placeholder="E-Mail" type="text" value="${email}" class="form-control">
              <div class="invalid-feedback">E-Mail label can't be empty</div>
              </div>
              <div class="form-group">
                <div>
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input name="input-personnel-admin" id="input-personnel-admin_0" type="checkbox" checked="checked" aria-describedby="input-personnel-adminHelpBlock" class="custom-control-input" value="rabbit"> 
                    <label for="input-personnel-admin_0" class="custom-control-label">Grant admin privileges</label>
                  </div> 
                  <span class="form-text text-muted">Check if this user needs to be access to the all functions in the dashboard.</span>
                </div>
              </div> 
            </form>
            `,
        {
            label: "Delete", class: "btn-danger", onClick: function () {
                deletePersonnelRow(staffId);
                destroyModalDialogs();
            }
        },
        {   label: "Cancel", class: "btn-danger", onClick: destroyModalDialogs},
        {
            label: "Save", class: "btn-success", onClick: function () {
                // Get form inputs
                let inputUsername = $("#input-personnel-username").val();
                let inputPassword = $("#input-personnel-password").val();
                let inputFirstName = $("#input-personnel-firstname").val();
                let inputLastName = $("#input-personnel-lastname").val();
                let inputEmail = $("#input-personnel-email").val();
                let inputAdmin = Boolean($("input:checked").is(":checked"))

                // Care about password only if a new password is entered
                let newPassword;
                if (!inputPassword) {
                    inputPassword = true;
                    newPassword = undefined;
                } else {
                    newPassword = inputPassword;
                }
                let status = validate(inputUsername, inputPassword, inputFirstName, inputLastName, inputEmail);

                if (status) {
                    updatePersonnel(staffId, inputUsername, newPassword, inputFirstName, inputLastName, inputEmail, inputAdmin)
                }

            }
        }
    )
}

/**
 * Validate form data
 * @param username
 * @param password
 * @param firstName
 * @param lastName
 * @param email
 */
function validate(username, password, firstName, lastName, email) {
    let validation_status = true;
    if (!username) {
        $("#input-personnel-username").addClass("is-invalid");
        validation_status = false;
    } else {
        $("#input-personnel-username").removeClass("is-invalid");
    }

    if (!password) {
        $("#input-personnel-password").addClass("is-invalid");
        validation_status = false;
    } else {
        $("#input-personnel-password").removeClass("is-invalid");
    }

    if (!firstName) {
        $("#input-personnel-firstname").addClass("is-invalid");
        validation_status = false;
    } else {
        $("#input-personnel-firstname").removeClass("is-invalid");
    }

    if (!lastName) {
        $("#input-personnel-lastname").addClass("is-invalid");
        validation_status = false;
    } else {
        $("#input-personnel-lastname").removeClass("is-invalid");
    }

    if (!email) {
        $("#input-personnel-email").addClass("is-invalid");
        validation_status = false;
    } else {
        $("#input-personnel-email").removeClass("is-invalid");
    }
    return validation_status;
}

/**
 * Add a row to the personnel table
 * @param staffId
 * @param username
 * @param firstName
 * @param lastName
 * @param email
 * @param admin
 */
function addPersonnelRow(staffId, username, firstName, lastName, email, admin) {
    let adminLabel = (admin) ? "Admin" : "Personnel";
    $("#personnel-table tbody").append(`
        <tr data-personnel-id="${staffId}">
            <td class="username-label">${username}</td>
            <td class="first-name-label">${firstName}</td>
            <td class="last-name-label">${lastName}</td>
            <td class="email-label">${email}</td>
            <td class="admin-label">${adminLabel}</td>
        </tr>
    `);
}

/**
 * Remove a row from personnel table
 * @param staffId
 */
function deletePersonnelRow(staffId) {
    $(`tr[data-personnel-id="${staffId}"]`).remove();
    destroyModalDialogs();
}

/**
 * Update a personnel row with the given data
 * @param staffId
 * @param username
 * @param firstName
 * @param lastName
 * @param email
 * @param admin
 */
function updatePersonnelRow(staffId, username, firstName, lastName, email, admin) {
    let adminLabel = (admin) ? "Admin" : "Personnel";
    $(`tr[data-personnel-id="${staffId}"] .username-label`).text(username);
    $(`tr[data-personnel-id="${staffId}"] .first-name-label`).text(firstName);
    $(`tr[data-personnel-id="${staffId}"] .last-name-label`).text(lastName);
    $(`tr[data-personnel-id="${staffId}"] .email-label`).text(email);
    $(`tr[data-personnel-id="${staffId}"] .admin-label`).text(adminLabel);
}

/** API CRUD OPERATIONS **/
function createPersonnel(username, password, firstName, lastName, email, admin) {
    let requestBody = {
        "username": username,
        "password": password,
        "firstName" : firstName,
        "lastName" : lastName,
        "email": email,
        "admin": Number(admin)
    }
    $.ajax({
        url: API.PERSONNEL + "/create",
        type: 'PUT',
        data: JSON.stringify(requestBody),
        contentType: 'application/json',
        success: function (data) {
            let personnel = requestBody;
            personnel.id = data.id;
            personnel_data.push(personnel)
            addPersonnelRow(data.id, username, firstName, lastName, email, admin);
            destroyModalDialogs();
        }
    })
}
function updatePersonnel(id, username, password, firstName, lastName, email, admin) {
    let requestBody = {
        "id" : id,
        "username": username,
        "firstName" : firstName,
        "lastName" : lastName,
        "email": email,
        "admin": Number(admin)
    }
    if (password) requestBody.password = password;

    $.ajax({
        url: API.PERSONNEL + "/update",
        type: 'PUT',
        data: JSON.stringify(requestBody),
        contentType: 'application/json',
        success: function (data) {
            updatePersonnelRow(data.id, username, firstName, lastName, email, admin);
            destroyModalDialogs();
        }
    })
}
function deletePersonnel() {
    let requestBody = {

    }
}