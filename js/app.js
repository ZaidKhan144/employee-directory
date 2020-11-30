const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
let employees = [];
const mainContainer = document.querySelector('.main-container');

fetch(urlAPI)
.then(res => res.json())
.then(data => data.results)
.then(displayEmployees)
.catch(err => console.log(err));

function displayEmployees(employeeData){
    employees = employeeData;
    var employeeHTML = '';
    employees.forEach((employee, index) => {
        
        employeeHTML += `
        <div class="card" data-index="${index}">
        <div class="inside">
        <img src="${employee.picture.large}" alt="">
        <div class="content">
        <h2>${employee.name.first} ${employee.name.last}</h2>
        <p>${employee.email}</p>
        <p>${employee.location.city}</p>
        </div>
     </div>
    </div>
        `
    });
    mainContainer.innerHTML = employeeHTML;
}

