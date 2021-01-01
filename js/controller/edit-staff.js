let staffIndex = 3;

$(document).ready(function () {
    let createStaffButton = $("#btn-add-staff");

    createStaffButton.click(function () {
       showCreateStaffDialog()
    })

    // TODO: Add event for each table cell seacrh jquery child nodes
    $("#personnel-table tr").click(function (e){
        let target = e.currentTarget;
        console.log(target)
        let staffId = target.dataset.personnelId;
        if (staffId) {
            console.log(staffId)
            showEditStaffDialog(staffId);
        }
    }) ;
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
                <label for="input-personnel-firstname">First Name</label> 
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
                let inputPersonnelUsername = $("#input-personnel-username").val();
                let inputPersonnelPassword = $("#input-personnel-password").val();
                let inputPersonnelFirstname = $("#input-personnel-firstname").val();
                let inputPersonnelLastname = $("#input-personnel-lastname").val();
                let inputPersonnelEmail = $("#input-personnel-email").val();
                let inputPersonnelAdmin;
                if ($("input:checked").is(":checked")){
                    inputPersonnelAdmin = "Admin"
                }else {
                    inputPersonnelAdmin = "Personnel"
                }
                actionCreateStaff(staffIndex,inputPersonnelUsername,inputPersonnelPassword,inputPersonnelFirstname,inputPersonnelLastname,inputPersonnelEmail,inputPersonnelAdmin);
                staffIndex++;
                destroyModalDialogs();
            }}
    )
}

function showEditStaffDialog(staffId) {
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
                <label for="input-personnel-firstname">First Name</label> 
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
        {label:"delete",class:"btn-danger",onClick: function(){
            actionDeleteStaff(staffId);
            destroyModalDialogs();
            }},
        {label: "Cancel", class: "btn-danger", onClick: destroyModalDialogs},
        {label: "Save", class: "btn-success", onClick : function () {
                let inputPersonnelUsername = $("#input-personnel-username").val();
                let inputPersonnelPassword = $("#input-personnel-password").val();
                let inputPersonnelFirstname = $("#input-personnel-firstname").val();
                let inputPersonnelLastname = $("#input-personnel-lastname").val();
                let inputPersonnelEmail = $("#input-personnel-email").val();
                let inputPersonnelAdmin;
                if ($("input:checked").is(":checked")){
                    inputPersonnelAdmin = "Admin"
                }else {
                    inputPersonnelAdmin = "Personnel"
                }
                actionEditStaff(staffId,inputPersonnelUsername,inputPersonnelFirstname,inputPersonnelLastname,inputPersonnelEmail,inputPersonnelAdmin);
                destroyModalDialogs();
            }}
    )
}

/**
 * TODO: The action for the save button of the create modal
 */
function actionCreateStaff(staffId,inputPersonnelUsername,inputPersonnelPassword,inputPersonnelFirstname,inputPersonnelLastname,inputPersonnelEmail,inputPersonnelAdmin) {
    $("#personnel-table-body").append(`
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
function actionDeleteStaff(staffId){

}

/**
 * TODO: The action for the edit button of the edit modal
 */
function actionEditStaff(staffId,inputPersonnelUsername,inputPersonnelFirstname,inputPersonnelLastname,inputPersonnelEmail,inputPersonnelAdmin) {
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

