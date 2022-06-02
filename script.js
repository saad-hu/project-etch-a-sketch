const containerDimension = 600; //600px
const squareBorder = 1; //1px border
const defaultGridSize = 16;
let black = true;
let rainbow = false;
let eraser = false;

const gridContainer = document.querySelector('#grid-container'); //reference to grid container. Needed for createGrid function
const buttonGridSize = document.querySelector('#button-grid-size'); //reference to change grid size button
const multicolorButton = document.querySelector('#multicolor-button'); //refernce to multicolor/rainbow button
const blackButton = document.querySelector('#black-mode-button');
const eraserButton = document.querySelector('#eraser-button');

//when the window loads, this will create a grid using the dafault grid size decalred on top of the code(16)
window.onload = function() {
    createGrid(defaultGridSize);
    activateBlack();
}

//adding an event to change grid button
buttonGridSize.addEventListener('click', () => {
    let size = takeGridSize();


    //if the function takeGridSize returns cancelled, no grid will be created, hence users previous drawing will be restored
    if(size != "canceled") {
        createGrid(size);
        activateBlack();
    }  
});


blackButton.addEventListener('click', () => {
    black = true;
    activateBlack();
})


multicolorButton.addEventListener('click', () => {
    rainbow = true;
    activateRainbow();
})

eraserButton.addEventListener('click', () => {
    black = true;
    activateEraser();
})

//this function prompts the user to enter a number between 1 and 64 inclusive for a grid size
function takeGridSize() {
    
    let correctInput, gridSize;
    do {
        gridSize = prompt("Enter size of new grid(1-64)");
        if(gridSize == null) return "canceled";    //when the user presses cancel or escape. returns a string "canceled" so we can check to create a grid or not.

        else if(gridSize >= 1 && gridSize <= 64) correctInput = true;

        else {
            alert("Please enter a valid number.")
            correctInput = false;
        } 
    }while(correctInput == false)
    
    return gridSize;
}


//creates a new grid by appending squares inside gridContainer
function createGrid(size) {

    //this while loop will delete all the current square (IF ANY) to create space to add new squares
    while(gridContainer.lastChild) {
        gridContainer.removeChild(gridContainer.lastChild)
    }

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

    //the boxes have been created and appended to the grid. now the grid is visible. 
}


//this function returns a random rgb color in the form "rgb(#,#,#)"
function randomRGB() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let color = `rgb(${r},${g},${b})`;

    return color;
}


function activateBlack() {
    //this code will add a mouseover and mousedown eventlistener to each squarebox that has been created. that is, this will activate sketching
    const gridSquare = document.querySelectorAll('.grid-square'); //nodelist of all squares 


    gridSquare.forEach((square) => {
        square.addEventListener('mouseover', (e) => {
            if(e.buttons == 1) {
                square.style['background-color'] = "black";
            }
        });

        square.addEventListener('mousedown', () => {
            square.style['background-color'] = "black";
        });
    })
}


function activateRainbow() {
    //this code will add a mouseover and mousedown eventlistener to each squarebox that has been created. that is, this will activate sketching
    const gridSquare = document.querySelectorAll('.grid-square'); //nodelist of all squares 

    gridSquare.forEach((square) => {
        square.addEventListener('mouseover', (e) => {
            if(e.buttons == 1) {
                square.style['background-color'] = randomRGB();
            }
        });

        square.addEventListener('mousedown', () => {
            square.style['background-color'] = randomRGB();
        });
    })
}

function activateEraser() {
    //this code will add a mouseover and mousedown eventlistener to each squarebox that has been created. that is, this will activate sketching
    const gridSquare = document.querySelectorAll('.grid-square'); //nodelist of all squares 

    gridSquare.forEach((square) => {
        square.addEventListener('mouseover', (e) => {
            if(e.buttons == 1) {
                square.style['background-color'] = "white";
            }
        });

        square.addEventListener('mousedown', () => {
            square.style['background-color'] = "white";
        });
    })
}