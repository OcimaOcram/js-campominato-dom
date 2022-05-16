let numeriEstratti = [];
let punti = 0;

const easy = document.getElementById("Easy");
const medium = document.getElementById("Medium");
const hard = document.getElementById("Hard");

easy.addEventListener('click', () => start(49, 'easy'));
medium.addEventListener('click', () => start(81, 'medium'));
hard.addEventListener('click', () => start(100, 'hard'));

function start(totCell, difficulty) {
    creazioneCelle(totCell, difficulty)
    const arraybombe = creazioneBombe(totCell);
    //ordiniamo l'array per poterlo leggere in modo veloce
    arraybombe.sort(function (a, b) {
        return a - b;
    });
    console.log(arraybombe);
    addClick(arraybombe, totCell);
    punti = 0;
}
function generateRandomNumber(min, max) {
    const range = (max - min) + 1;
    return Math.floor(Math.random() * range + min);
}
function mostraBombe(arraybombe) {
    const allcells = document.querySelectorAll(".cell");
    for (let i = 0; i < allcells.length; i++) {
        if (arraybombe.includes(i + 1)) {
            const cellabomba = allcells[i];
            cellabomba.classList.add('bg-red');
        }
    }
}
function incrementaPunteggio(cell, punti) {
    let punteggio = punti + 1;
    cell.classList.add("no-pointer");
    return punteggio;
}
function checkClick(cell, i, arraybombe) {
    const bomba = arraybombe.includes(i + 1);
    let celle = document.querySelectorAll(".cell");
    let puntivincita = celle.length - 16;
    if (bomba) {
        let win = false;
        showspecchio(win, punti, puntivincita);
        mostraBombe(arraybombe);
    } else {
        cell.classList.add("bg-lightgreen");
        punti = incrementaPunteggio(cell, punti);
        showspecchio(true, punti, puntivincita);
    }
}
function showspecchio(condizione, punti, allcells) {
    const specchio = document.createElement("div");
    specchio.classList.add("specchio");
    const grid = document.getElementById("Grid");
    const title = document.createElement("h1");
    const point = document.createElement("h3");
    specchio.appendChild(title);
    specchio.appendChild(point);
    if (condizione == false) {
        grid.appendChild(specchio);
        specchio.classList.add("bg-lose");
        title.classList.add("c-blue");
        title.innerText = "Hai perso.";
        point.innerText = "il tuo punteggio è: " + punti;
    }
    if (punti == allcells) {
        grid.appendChild(specchio);
        specchio.classList.add("bg-win");
        title.classList.add("c-lightgreen");
        title.innerText = "Hai vinto.";
        point.innerText = "il tuo punteggio è: " + punti;
    }
}
function creazioneCelle(totCell, difficolty) {
    const grid = document.getElementById("Grid");
    grid.innerHTML = " ";
    for (let i = 0; i < totCell; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.innerText = i + 1;
        cell.classList.add(difficolty)
        grid.appendChild(cell);
    }
}
function creazioneBombe(totCell) {
    const registro = [];
    while (registro.length < 16) {
        const numero = generateRandomNumber(1, totCell);
        if (registro.includes(numero) === false) {
            registro.push(numero);
        }
    }
    return registro;
}
function addClick(arraybombe, totCell) {
    const allcells = document.querySelectorAll(".cell");
    for (let i = 0; i < allcells.length; i++) {
        const cell = allcells[i];
        cell.addEventListener('click', () => {
            checkClick(cell, i, arraybombe, totCell);
        })

    }
}