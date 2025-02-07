function createGrid() {
    // DOM Elements
    const container = document.querySelector('.grid-container');
    const colorPicker = document.getElementById('color-picker');
    const sizeSlider = document.getElementById('size-slider');
    const gridSizeLabel = document.querySelector('.grid-size-label');
    const eraserButton = document.getElementById('eraser');
    const clearButton = document.getElementById('clear');

    // State Management
    let currentColor = colorPicker.value;
    let isEraserActive = false;
    let isMouseDown = false;
    let gridSize = sizeSlider.value;

    // Grid Creation
    function createGridCells(size) {
        container.innerHTML = '';
        container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

        for (let i = 0; i < size * size; i++) { 
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.addEventListener('mousedown', handleMouseDown);
            cell.addEventListener('mouseover', handleMouseOver);
            container.appendChild(cell);
        }
    }

    // Drawing Functions
    function draw(element) {
        element.style.backgroundColor = isEraserActive ? 'black' : currentColor;
    }

    // Event Handlers
    function handleMouseDown(event) {
        draw(event.target);
        isMouseDown = true;
    }

    function handleMouseOver(event) {
        if (isMouseDown) draw(event.target);
    }

    function handleMouseUp() {
        isMouseDown = false;
    }

    function handleColorChange(event) {
        const newColor = event.target.value;
        if (newColor === '#000000') {
            colorPicker.value = '#ff0000';
            currentColor = '#ff0000';
        } else {
            currentColor = newColor;
        }
    }

    function toggleEraser() {
        isEraserActive = !isEraserActive;
        eraserButton.classList.toggle('active', isEraserActive);
    }

    function clearGrid() {
        const cells = document.querySelectorAll('.grid-cell');
        cells.forEach(cell => cell.style.backgroundColor = 'black');
    }

    function updateGridSize(event) {
        gridSize = event.target.value;
        gridSizeLabel.textContent = `Grid Size: ${gridSize} x ${gridSize}`;
        createGridCells(gridSize);
    }

    // Initialize Grid
    function initialize() {
        createGridCells(gridSize);
        gridSizeLabel.textContent = `Grid Size: ${gridSize} x ${gridSize}`;
    }

    // Event Listeners
    document.addEventListener('mouseup', handleMouseUp);
    colorPicker.addEventListener('input', handleColorChange);
    eraserButton.addEventListener('click', toggleEraser);
    clearButton.addEventListener('click', clearGrid);
    sizeSlider.addEventListener('input', updateGridSize);

    // Start the application
    initialize();
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', createGrid);
