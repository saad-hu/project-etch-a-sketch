const containerDimension = 600; //600px
const squareBorder = 1; //1px border
const defaultGridSize = 16;


const gridContainer = document.querySelector('#grid-container'); //reference to grid container. Needed for createGrid function
const multicolorButton = document.querySelector('#multicolor-button'); //refernce to multicolor button
const eraserButton = document.querySelector('#eraser-button');


let buttonsReferenceArray = [multicolorButton, eraserButton]; //an array of references to buttons. This will be used in popButton() function

//reference to the color input form control
let colorInput = document.querySelector('#user-color');

//refernce to slider form control for grid size and it's display output element
let gridSizeSlider = document.querySelector("#grid-size-slider");
let sizeOutput = document.querySelector('#sizeOutput');

//when the window loads, this will create a grid using the dafault grid size decalred on top of the code(16)
window.onload = function () {
    createGrid(gridSizeSlider.value);
    activateSketching(colorInput.value);
    displayGridSize();
}

//adding event listener to the color input form control, so that any changes occur, the sketching color is changed via the activateSketching() function
colorInput.addEventListener('input', () => {
    activateSketching(colorInput.value);
})

multicolorButton.addEventListener('click', () => {
    multicolor = true;
    activateMulticolor();
    popButton(multicolorButton);
})

eraserButton.addEventListener('click', () => {
    black = true;
    activateEraser();
    popButton(eraserButton);
})

//this function returns a random rgb color in the form "rgb(#,#,#)"
function randomRGB() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let color = `rgb(${r},${g},${b})`;

    return color;
}

//creates a new grid by appending squares inside gridContainer
function createGrid(size) {

    //this while loop will delete all the current square (IF ANY) to create space to add new squares
    while (gridContainer.lastChild) {
        gridContainer.removeChild(gridContainer.lastChild)
    }

    let sizeSq = size ** 2;

    //calcuating square width and height accroding to grid size
    let squareDimension = (containerDimension - (2 * size * squareBorder)) / size;


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

function activateSketching(color) {
    //this code will add a mouseover and mousedown eventlistener to each squarebox that has been created. that is, this will activate sketching
    const gridSquare = document.querySelectorAll('.grid-square'); //nodelist of all squares 


    gridSquare.forEach((square) => {
        square.addEventListener('mouseover', (e) => {
            if (e.buttons == 1) {
                square.style['background-color'] = color;
            }
        });

        square.addEventListener('mousedown', () => {
            square.style['background-color'] = color;
        });
    })
}


function activateMulticolor() {
    //this code will add a mouseover and mousedown eventlistener to each squarebox that has been created. that is, this will activate sketching
    const gridSquare = document.querySelectorAll('.grid-square'); //nodelist of all squares 

    gridSquare.forEach((square) => {
        square.addEventListener('mouseover', (e) => {
            if (e.buttons == 1) {
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
            if (e.buttons == 1) {
                square.style['background-color'] = "white";
            }
        });

        square.addEventListener('mousedown', () => {
            square.style['background-color'] = "white";
        });
    })
}


function popButton(button) {

    for (let i = 0; i < buttonsReferenceArray.length; i++) {
        if (buttonsReferenceArray[i] == button) {
            buttonsReferenceArray[i].style.cssText = "background-color: darkblue";
        }
        else {
            buttonsReferenceArray[i].style = "none";
        }
    }
}


//slider code starts here
//when the slider is moved, this event listener will display the changing value(grid size)
gridSizeSlider.addEventListener('input', displayGridSize);

function displayGridSize() {
    sizeOutput.textContent = `${gridSizeSlider.value}x${gridSizeSlider.value}`;
}

//when the slider is moved, stoped and released, this event listener will change the grid size 
gridSizeSlider.addEventListener('change', () => {
    createGrid(gridSizeSlider.value);
    activateSketching(colorInput.value);
});
