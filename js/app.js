const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
let employees = [];
const mainContainer = document.querySelector('.main-container');
const replaceOverlay = document.querySelector('.overlay-inside');
const overlay = document.querySelector('.overlay');
const oclose = document.getElementsByClassName('.close');

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

function displayOverlay(index){

        let overlayStuff = employees[index];
        let phone = overlayStuff.phone;
        let streetNum = overlayStuff.location.street.number;
        let streetName = overlayStuff.location.street.name;
        let streetState = overlayStuff.location.state;
        let streetPostCode = overlayStuff.location.streetPostCode;
        let city = overlayStuff.location.city;
        let email = overlayStuff.email;
        let name = `${overlayStuff.name.first} ${overlayStuff.name.last}`;
        let img = overlayStuff.picture.large;
        let date = new Date(overlayStuff.dob.date);

    const overlayHTML = `
    <div class="overlay-card" data-index="${index}">
    <div class="overlay-inside">
    <button>X</button>
    <img class="overlay-img" src="${img}" alt="">
    <div class="overlay-content">
    <h2>${name}</h2>
    <p>${email}</p>
    <p>${city}</p>
    <div class="line"></div>
    <p>${phone}</p>
    <p>${streetNum} ${streetName}, ${streetState} ${streetPostCode}</p>
    <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
</div>
</div>
    </div>
    `;
    overlay.classList.remove('hidden');
    replaceOverlay.innerHTML = overlayHTML;
}

mainContainer.addEventListener('click', (e) =>{
    if(e.target !== mainContainer){
        const card = e.target.closest('.card');
        const index = card.getAttribute('data-index');

        displayOverlay(index);
    }
});

overlay.addEventListener('click', ()=>{
    overlay.classList.add('hidden');
});