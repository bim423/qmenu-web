$(document).ready(function () {
    let createStaffButton = $("#btn-add-staff");

    createStaffButton.click(function () {
       showCreateStaffDialog()
    })

    // TODO: Add event for each table cell seacrh jquery child nodes
    $("#personnel-table tr").click(function (e) {
        console.log(e.currentTarget);
    });
})

function showCreateStaffDialog() {
    // Show create staff modal
    showModalDialog("Create new personnel",
        `
            <form>
              <div class="form-group">
                <label for="text">Username</label> 
                <input id="input-personnel-username" type="text" placeholder="Username" class="form-control">
              </div>
              <div class="form-group">
                <label for="input-personnel-password">Password</label> 
                <input id="input-personnel-password" placeholder="Password" name="input-personnel-password" type="password" class="form-control">
              </div>
              <div class="form-group">
                <label for="nput-personnel-firstname">First Name</label> 
                <input id="input-personnel-firstname" type="text" placeholder="First Name" class="form-control">
              </div>
              <div class="form-group">
                <label for="input-personnel-lastname">Last Name</label> 
                <input id="input-personnel-lastname" type="text"  placeholder="Last Name" class="form-control">
              </div>
              <div class="form-group">
                <label for="input-personnel-email">E-Mail</label> 
              <input id="input-personnel-email" placeholder="E-Mail" type="text" class="form-control">
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
        {label: "Create", class: "btn-success", onClick: function () {
            alert("yaratıldım")
            }}
    )
}

function showEditStaffDialog() {
    // Show create staff modal
    showModalDialog("Edit personnel",
        `
            <form>
              <div class="form-group">
                <label for="text">Username</label> 
                <input id="input-personnel-username" type="text" placeholder="Username" class="form-control" >
              </div>
              <div class="form-group">
                <label for="input-personnel-password">Password</label> 
                <input id="input-personnel-password" placeholder="Password" name="input-personnel-password" type="password" class="form-control">
              </div>
              <div class="form-group">
                <label for="nput-personnel-firstname">First Name</label> 
                <input id="input-personnel-firstname" type="text" placeholder="First Name" class="form-control">
              </div>
              <div class="form-group">
                <label for="input-personnel-lastname">Last Name</label> 
                <input id="input-personnel-lastname" type="text"  placeholder="Last Name" class="form-control">
              </div>
              <div class="form-group">
                <label for="input-personnel-email">E-Mail</label> 
              <input id="input-personnel-email" placeholder="E-Mail" type="text" class="form-control">
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
        {label: "Save", class: "btn-success", onClick: createStaff}
    )
}

/**
 * TODO: The action for the save button of the create modal
 */
function actionCreateStaff() {

}

/**
 * TODO: The action for the edit button of the edit modal
 */
function actionEditStaff() {

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

