let staffIndex = 3;

$(document).ready(function () {
    let createStaffButton = $("#btn-add-staff");

    createStaffButton.click(function () {
        showCreateStaffDialog()
    })

    // Add event to the each table row
    $("#personnel-table ").on('click', 'tr', function (e) {
        let target = e.currentTarget;
        console.log(target)
        let staffId = target.dataset.personnelId;
        if (staffId) {
            console.log("Editing staff " + staffId)
            showEditStaffDialog(staffId);
        }
    });
})

function showCreateStaffDialog() {
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
                let inputPersonnelUsername = $("#input-personnel-username").val();
                let inputPersonnelPassword = $("#input-personnel-password").val();
                let inputPersonnelFirstname = $("#input-personnel-firstname").val();
                let inputPersonnelLastname = $("#input-personnel-lastname").val();
                let inputPersonnelEmail = $("#input-personnel-email").val();
                let inputPersonnelAdmin;
                if ($("input:checked").is(":checked")) {
                    inputPersonnelAdmin = "Admin"
                } else {
                    inputPersonnelAdmin = "Personnel"
                }
                validate(inputPersonnelUsername, inputPersonnelPassword, inputPersonnelFirstname, inputPersonnelLastname, inputPersonnelEmail);

                if (inputPersonnelUsername && inputPersonnelPassword && inputPersonnelFirstname && inputPersonnelLastname && inputPersonnelEmail) {

                    actionCreateStaff(staffIndex, inputPersonnelUsername, inputPersonnelPassword, inputPersonnelFirstname, inputPersonnelLastname, inputPersonnelEmail, inputPersonnelAdmin);
                    staffIndex++;
                    destroyModalDialogs();
                }


            }
        }
    )
}

/**
 * Show edit staff modal dialog
 * TODO: Set input values to the previous values.
 * @param staffId
 */
function showEditStaffDialog(staffId) {
    let username = $(`tr[data-personnel-id="${staffId}"] > .personnel-table-username-label`).text();
    let firstname = $(`tr[data-personnel-id="${staffId}"] > .personnel-table-firstname-label`).text();
    let lastname = $(`tr[data-personnel-id="${staffId}"] > .personnel-table-lastname-label`).text();
    let email = $(`tr[data-personnel-id="${staffId}"] > .personnel-table-email-label`).text();

    // Show create staff modal
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
                <input id="input-personnel-firstname" type="text" placeholder="First Name" value="${firstname}" class="form-control">
                <div class="invalid-feedback">First Name label can't be empty</div>
              </div>
              <div class="form-group">
                <label for="input-personnel-lastname">Last Name</label> 
                <input id="input-personnel-lastname" type="text"  placeholder="Last Name" value="${lastname}" class="form-control">
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
            label: "delete", class: "btn-danger", onClick: function () {
                actionDeleteStaff(staffId);
                destroyModalDialogs();
            }
        },
        {label: "Cancel", class: "btn-danger", onClick: destroyModalDialogs},
        {
            label: "Save", class: "btn-success", onClick: function () {
                let inputPersonnelUsername = $("#input-personnel-username").val();
                let inputPersonnelPassword = $("#input-personnel-password").val();
                let inputPersonnelFirstname = $("#input-personnel-firstname").val();
                let inputPersonnelLastname = $("#input-personnel-lastname").val();
                let inputPersonnelEmail = $("#input-personnel-email").val();
                let inputPersonnelAdmin;
                if ($("input:checked").is(":checked")) {
                    inputPersonnelAdmin = "Admin"
                } else {
                    inputPersonnelAdmin = "Personnel"
                }

                validate(inputPersonnelUsername, inputPersonnelPassword, inputPersonnelFirstname, inputPersonnelLastname, inputPersonnelEmail);
                if (inputPersonnelUsername && inputPersonnelPassword && inputPersonnelFirstname && inputPersonnelLastname && inputPersonnelEmail) {
                    actionUpdateStaff(staffId, inputPersonnelUsername, inputPersonnelFirstname, inputPersonnelLastname, inputPersonnelEmail, inputPersonnelAdmin);
                    destroyModalDialogs();
                }

            }
        }
    )
}

/**
 * Validate form data
 * TODO: Make this function boolean then check the validation status rather than checking each value multiple times
 * @param inputPersonnelUsername
 * @param inputPersonnelPassword
 * @param inputPersonnelFirstname
 * @param inputPersonnelLastname
 * @param inputPersonnelEmail
 */
function validate(inputPersonnelUsername, inputPersonnelPassword, inputPersonnelFirstname, inputPersonnelLastname, inputPersonnelEmail) {
    if (!inputPersonnelUsername) {
        $("#input-personnel-username").addClass("is-invalid");
    } else {
        $("#input-personnel-username").removeClass("is-invalid");
    }

    if (!inputPersonnelPassword) {
        $("#input-personnel-password").addClass("is-invalid");
    } else {
        $("#input-personnel-password").removeClass("is-invalid");
    }

    if (!inputPersonnelFirstname) {
        $("#input-personnel-firstname").addClass("is-invalid");
    } else {
        $("#input-personnel-firstname").removeClass("is-invalid");
    }

    if (!inputPersonnelLastname) {
        $("#input-personnel-lastname").addClass("is-invalid");
    } else {
        $("#input-personnel-lastname").removeClass("is-invalid");
    }

    if (!inputPersonnelEmail) {
        $("#input-personnel-email").addClass("is-invalid");
    } else {
        $("#input-personnel-email").removeClass("is-invalid");
    }
}

/**
 * TODO: The action for the save button of the create modal
 */
function actionCreateStaff(staffId, inputPersonnelUsername, inputPersonnelPassword, inputPersonnelFirstname, inputPersonnelLastname, inputPersonnelEmail, inputPersonnelAdmin) {
    $("#personnel-table tbody").append(`
        <tr data-personnel-id="${staffId}">
            <td class="personnel-table-username-label">${inputPersonnelUsername}</td>
            <td class="personnel-table-firstname-label">${inputPersonnelFirstname}</td>
            <td class="personnel-table-lastname-label">${inputPersonnelLastname}</td>
            <td class="personnel-table-email-label">${inputPersonnelEmail}</td>
            <td class="personnel-table-admin-label">${inputPersonnelAdmin}</td>
        </tr>
    `);
}

/**
 * TODO: The action for the delete button of the edit modal
 */
function actionDeleteStaff(staffId) {
    $(`tr[data-personnel-id="${staffId}"]`).remove();
    destroyModalDialogs();
}

/**
 * TODO: The action for the edit button of the edit modal
 */
function actionUpdateStaff(staffId, inputPersonnelUsername, inputPersonnelFirstname, inputPersonnelLastname, inputPersonnelEmail, inputPersonnelAdmin) {
    $(`tr[data-personnel-id="${staffId}"] .personnel-table-username-label`).text(inputPersonnelUsername);
    $(`tr[data-personnel-id="${staffId}"] .personnel-table-firstname-label`).text(inputPersonnelFirstname);
    $(`tr[data-personnel-id="${staffId}"] .personnel-table-lastname-label`).text(inputPersonnelLastname);
    $(`tr[data-personnel-id="${staffId}"] .personnel-table-email-label`).text(inputPersonnelEmail);
    $(`tr[data-personnel-id="${staffId}"] .personnel-table-admin-label`).text(inputPersonnelAdmin);
}

/** API CRUD **/
function createStaff() {
    //TODO: API request
}

function updateStaff() {
    //TODO: API request
}

function deleteStaff() {
    //TODO: API request
}
