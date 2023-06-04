//! ENDPOINT
const endpoint = "https://jsonplaceholder.typicode.com/users";

//!Funzione iniziale che esegue la chiamata e lancia la funzione main(jsonData);
window.onload = start();

//funzione start che si avvia anche al click del tasto show all users
const restoreButton = document.getElementById("restoreButton");
const section = document.getElementById("section");
restoreButton.addEventListener("click", () => { 
    section.innerHTML = "";
    start()
})

async function start() {
    //chiamata e risposta
    try {
        const res = await fetch(endpoint);
        const jsonData = await res.json();
        main(jsonData);
        
    } catch (error) {
        console.log(error)
    }
}

function main(jsonData) {
    //stampa tutti gli utenti in jsonData
    jsonData.forEach((user) => {
        showResult(user)
    });
    // ADD EVENT LISTENER che avvia la funzione cerca dopo aver catturato i value degli input
    let searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", ()=>{
        //prima svuota il dom
        section.innerHTML = "";
        // poi cattura i value e avvia filterResult che inietterà tramite showResult i risultati della ricerca
        let searchBar = document.getElementById("searchBar");
        let selectMenu = document.getElementById("selectMenu");
        let keyword = searchBar.value.toLowerCase();
        let menuChoice = selectMenu.value;
        filterResult(jsonData, keyword, menuChoice);
    })
}

//! filtra jsonData.menuChoice (il campo del dropdown menu) per cercare keyword (input testo)
function filterResult(jsonData, keyword, menuChoice) {
    console.log(jsonData, menuChoice);
    for (const user of jsonData) {
        /* console.log(x[menuChoice]) */
        if (user[menuChoice].toLowerCase().includes(keyword)) {
            showResult(user);
        }            
    }
}

//!Funzione che crea il dom
function showResult(user) {
    let section = document.getElementById("section");
    console.log(user);
    //elementi del dom 
    let box = document.createElement("div");
    let name = document.createElement("p");
    let userName = document.createElement("p");
    let phone = document.createElement("p");
    let email = document.createElement("a");
    let divider = document.createElement("hr");
    let id = document.createElement("p")
    //class
    box.classList.add("d-flex", "row");
    name.classList.add("col-2");
    userName.classList.add("col-3");
    email.classList.add("col-3", "text-truncate");
    phone.classList.add("col-3");
    divider.classList.add("hr");
    id.classList.add("col-1")
    //innerText
    name.innerText = user.name;
    userName.innerText = user.username;
    phone.innerText = user.phone;
    email.innerText = user.email;
    id.innerText = user.id;
    //append
    box.append(id)
    box.append(name);
    box.append(userName);
    box.append(email);
    box.append(phone);
    section.append(box);
    section.append(divider)
}