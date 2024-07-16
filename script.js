let title = document.querySelector("#title");
let content = document.querySelector("#content");
let publisher = document.querySelector("#published");
let checkedPublic = document.querySelector("#checkedPublic");
// Close the modal
let modal = document.querySelector('#exampleModal');
let modalInstance = mdb.Modal.getInstance(modal);
let selectedRow = null;

function main(){   
    if(selectedRow == null){
        createNew();
    }else{
        updateData();
        selectedRow = null;
    }
}

DisplayData();


function createNew(){   
    document.querySelector("#createNew").classList.remove("yellow");        
    document.querySelector("#createNew").innerHTML = "Create Tutorial";
    let checkStatus;
    if(publisher.checked){
        checkStatus = 1;
    }else{
        checkStatus = 0;
    }
    
    
    fetch('https://api-crud-yrvv.onrender.com/api/tutorials',{
        method:"POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(
            {
                title: title.value,
                description: content.value,
                published : checkStatus
            }
        )
    })
    .then(res=>res.json())
    .then(json=>{
            // console.log(json)
            modalInstance.hide();
            DisplayData();
    })
    // console.log(checkStatus);
    title.value = "";
    content.value = "";
    publisher.checked = false;

}

function DisplayData() {
    
    fetch('https://api-crud-yrvv.onrender.com/api/tutorials')
        .then(res=>res.json())
        .then(json=>{ 
            // console.log(json)
            let row = ''
            let publishStatus = "";
            
            json.forEach(element => {
            if(element.published == 1){
                publishStatus = "Public";
            }else{
                publishStatus = "Awaiting";
            }
            row += `
            <tr data-row-id="${element.id}" data-row-title="${element.title}" data-row-description="${element.description}" data-row-published="${element.published}">
                <td>${element.id}</td>
                <td>${element.title}</td>
                <td class="ellipsis" tabindex="0" data-mdb-tooltip-init title="${element.description}">${element.description}</td>
                <td><span class="badge badge-warning rounded-pill d-inline">${publishStatus}</span></td>
                <td>
                    <button  onclick="editData(this)" type="button" class="btn btn-warning btn-rounded btn-sm fw-bold" data-mdb-ripple-color="dark" data-mdb-ripple-init data-mdb-modal-init data-mdb-target="#exampleModal">
                        Edit
                    </button>
                    <button type="button" class="btn btn-danger btn-rounded btn-sm fw-bold" data-mdb-ripple-color="dark" onclick="deleteRow(this)">
                        Delete
                    </button>
                </td>
            </tr>
        `;
           });
           let tbody = document.querySelector("tbody");
           tbody.innerHTML=row;
        })
}


function editData(row){

    selectedRow = row.parentElement.parentElement;
    // let rowId = selectedRow.getAttribute('data-row-id');
    let rowTitle = selectedRow.getAttribute('data-row-title');
    let rowContent = selectedRow.getAttribute('data-row-description');
    let rowpublished = selectedRow.getAttribute('data-row-published');
    // console.log(rowId); 
    // console.log(rowTitle);
    // console.log(rowContent);
    // console.log(rowpublished);
    if(rowpublished == 1){
        publisher.checked = true;
    }else{
        publisher.checked = false;
    }
     
    title.value = rowTitle;
    content.value = rowContent;
    document.querySelector("#createNew").classList.add("yellow");
    document.querySelector("#createNew").innerHTML = "Update";
}

function updateData(){
    let checkStatus;
    if(publisher.checked){
        checkStatus = 1;
    }else{
        checkStatus = 0;
    }

    let rowId = selectedRow.getAttribute('data-row-id');
    fetch('https://api-crud-yrvv.onrender.com/api/tutorials/' + rowId ,{
        method:"PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(
            {
                title: title.value,
                description: content.value,
                published : checkStatus
            }
        )
    })
        .then(res=>res.json())
        .then(json=>{
            modalInstance.hide();
            DisplayData();})
            title.value = "";
            content.value = "";
            publisher.checked = false;
            checkedPublic.checked = false;
            
    document.querySelector("#createNew").innerHTML = "Create Tutorial";
    document.querySelector("#createNew").classList.remove("yellow"); 
}

// Get public

function GetPublic(){
    
    let status = "";
    if(checkedPublic.checked){
        status = "/published";
    }else{
        status = "";
    }
    // console.log(status);
    fetch('https://api-crud-yrvv.onrender.com/api/tutorials' + status)
        .then(res=>res.json())
        .then(json=>{ 
            // console.log(json)
            let row = ''
            let publishStatus = "";
            
            json.forEach(element => {
            if(element.published == 1){
                publishStatus = "Public";
                row += `
                        <tr data-row-id="${element.id}" data-row-title="${element.title}" data-row-description="${element.description}" data-row-published="${element.published}">
                            <td>${element.id}</td>
                            <td>${element.title}</td>
                            <td>${element.description}</td>
                            <td><span class="badge badge-warning rounded-pill d-inline">${publishStatus}</span></td>
                            <td>
                                <button  onclick="editData(this)" type="button" class="btn btn-warning btn-rounded btn-sm fw-bold" data-mdb-ripple-color="dark" data-mdb-ripple-init data-mdb-modal-init data-mdb-target="#exampleModal">
                                    Edit
                                </button>
                                <button type="button" class="btn btn-danger btn-rounded btn-sm fw-bold" data-mdb-ripple-color="dark" onclick="deleteRow(this)">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    `;
            }else{
                if(element.published == 1){
                    publishStatus = "Public";
                }else{
                    publishStatus = "Awaiting";
                }
                row += `
                <tr data-row-id="${element.id}" data-row-title="${element.title}" data-row-description="${element.description}" data-row-published="${element.published}">
                    <td>${element.id}</td>
                    <td>${element.title}</td>
                    <td>${element.description}</td>
                    <td><span class="badge badge-warning rounded-pill d-inline">${publishStatus}</span></td>
                    <td>
                        <button  onclick="editData(this)" type="button" class="btn btn-warning btn-rounded btn-sm fw-bold" data-mdb-ripple-color="dark" data-mdb-ripple-init data-mdb-modal-init data-mdb-target="#exampleModal">
                            Edit
                        </button>
                        <button type="button" class="btn btn-danger btn-rounded btn-sm fw-bold" data-mdb-ripple-color="dark" onclick="deleteRow(this)">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
            }
           });
           let tbody = document.querySelector("tbody");
           tbody.innerHTML=row;     
        })
}

function deleteRow(row){
    
    selectedRow = row.parentElement.parentElement;
    let rowId = selectedRow.getAttribute('data-row-id');
    
    // console.log(rowId); 
    fetch('https://api-crud-yrvv.onrender.com/api/tutorials/' + rowId , {
        method:"DELETE"
    })
        .then(res=>res.json())
        .then(json=>{
            // selectedRow.remove();
            DisplayData();
        })
        checkedPublic.checked = false;
}
