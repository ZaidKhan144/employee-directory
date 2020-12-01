const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
let employees = [];
const mainContainer = document.querySelector('.main-container');
const replaceOverlay = document.querySelector('.overlay-inside');
const overlay = document.querySelector('.overlay');
const overlayCard = document.querySelector('.overlay-card');


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
        let streetPostCode = overlayStuff.location.postcode;
        let city = overlayStuff.location.city;
        let email = overlayStuff.email;
        let name = `${overlayStuff.name.first} ${overlayStuff.name.last}`;
        let img = overlayStuff.picture.large;
        let date = new Date(overlayStuff.dob.date);

    const overlayHTML = `
    <button>X</button>
    <img class="overlay-img" src="${img}" alt="">
    <div class="overlay-content">
    <h2>${name}</h2>
    <p>${email}</p>
    <p>${city}</p>
    <div class="line"></div>
    
    <p class="left-arrow"><i class="fas fa-arrow-left"></i></p>
    <p class="right-arrow"><i class="fas fa-arrow-right"></i></p>
    
    <p>${phone}</p>
    <p>${streetNum} ${streetName}, ${streetState} ${streetPostCode}</p>
    <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;
    overlay.classList.remove('hidden');
    replaceOverlay.innerHTML = overlayHTML;
}
    

mainContainer.addEventListener('click', (e) =>{
    
    if(e.target !== mainContainer){
        const card = e.target.closest('.card');
        let index = card.getAttribute('data-index');

        displayOverlay(index);

        overlay.addEventListener('click', (e) => {
            
            const rightarrow = document.querySelector('.fa-arrow-right');
            if(e.target === rightarrow){
                console.log('working');
                if(index < employees.length - 1){
                    index++;
                    displayOverlay(index);
                }
            }
            
        });
        overlay.addEventListener('click', (e)=>{
            const leftarrow = document.querySelector('.fa-arrow-left');
            if(e.target === leftarrow){
                if(index > 0){
                    index--;
                    displayOverlay(index);
                }
            }
        });
    }
});

overlay.addEventListener('click', (e)=>{
    const oclose = document.querySelector('button');
     if(e.target === oclose){
        overlay.classList.add('hidden');
    }
});


let input = document.querySelector('input');
input.addEventListener('keyup', searchEmp);

function searchEmp(txt){
    
    const names = document.getElementsByTagName('h2');
    text = txt.target.value.toUpperCase();
    //console.log(`text = ${text}`); 

    for(let i=0; i<names.length; i++){
        let name = names[i].textContent;
        nameCap = name.toUpperCase();
        if(nameCap.includes(text)){
            names[i].parentNode.parentNode.parentNode.style.display = '';
        }else{
            names[i].parentNode.parentNode.parentNode.style.display = 'none';
        }
    }
}


