const containerDimension = 350; //600px
const squareBorder = 1; //1px border


//reference to grid container. Needed for createGrid function
const gridContainer = document.querySelector('#grid-container');

const buttonGridSize = document.querySelector('#button-grid-size');

buttonGridSize.addEventListener('click', () => {
    let size = takeGridSize();
    createGrid(size);
    activateSketching();
})









function takeGridSize() {
    //taking input of grid size
    let gridSize = +prompt("Enter size of grid(max 64");
    return gridSize;
}



function createGrid(size) {
    let sizeSq = size ** 2;


    //calcuating square width and height accroding to grid size
    let squareDimension = ( containerDimension - (2*size * squareBorder) ) / size;

    //this loop creates a square in memory according to the calcuated dimensions, and then appends that square to the grid-container
    for (let i = 0; i < sizeSq; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        
        gridSquare.style.width = squareDimension + 'px'; 
        gridSquare.style.height = squareDimension + 'px';
        gridContainer.appendChild(gridSquare);
    }
}


function activateSketching() {
    const gridSquare = document.querySelectorAll('.grid-square');
    gridSquare.forEach((square) => {

    square.addEventListener('mouseover', () => {
        square.style['background-color'] = "black";
    })  
});
}