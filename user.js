function DisplayDataForUser() {
    
    fetch('https://api-crud-yrvv.onrender.com/api/tutorials')
        .then(res=>res.json())
        .then(json=>{ 
            // console.log(json)
            let card = "";
            json.forEach(element => {
            if(element.published == 1){
                publishStatus = "Public";
            }else{
                publishStatus = "Awaiting";
            }
            card += `
            <div class="col-3 my-5">
                <div class="card">
                    <div class="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
                      <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp" class="img-fluid"/>
                      <a href="#!">
                        <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
                      </a>
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">${element.title}</h5>
                      <p class="card-text">${element.description}</p>
                      <a href="#!" class="btn btn-primary" data-mdb-ripple-init>Show All</a>
                      <span class="btn float-end disabled">${publishStatus}</span>
                    </div>
                  </div>
            </div>
           `;
           });
           document.querySelector("#row").innerHTML = card;
        })
        
}
DisplayDataForUser();