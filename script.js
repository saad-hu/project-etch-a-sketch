let size = 8;
let sizeSq = size * size;

const gridContainer = document.querySelector('#grid-container');


for (let i = 0; i < sizeSq; i++) {
    const gridSquare = document.createElement('div');
    gridSquare.classList.add('grid-square');

    gridContainer.appendChild(gridSquare);
}


const gridSquare = document.querySelectorAll('.grid-square');


gridSquare.forEach((square) => {

    square.addEventListener('mouseover', () => {
        square.style.cssText = "background-color: black";
    })  
});





// create function that creates a box (in memory) then appends to gridContainer