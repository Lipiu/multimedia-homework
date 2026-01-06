// start or stop the graph animation

const start_pause_btn = document.getElementById('button-start-stop');

start_pause_btn.addEventListener('click', () => {
    if(!window.isRunning){
        start_pause_btn.textContent = 'Pause Animation';
        window.startAnimation();
    }
    else{
        start_pause_btn.textContent = 'Start Animation';
        window.stopAnimation();
    }
});

// adjust speed
const speedSlider = document.getElementById('speedSlider');
const BASE_DELAY = 2000;
const MIN_DELAY = 100;

function getDelayFromSlider(value){
    const normalized = value / 10;
    return BASE_DELAY - normalized * (BASE_DELAY - MIN_DELAY);
}

speedSlider.addEventListener('input', () => {
    if(!window.isRunning){
        return;
    }
    clearInterval(window.intervalId);

    const delay = getDelayFromSlider(speedSlider.value);

    window.intervalId = setInterval(() => {
        generateNewValue();
        draw();
    }, delay);
});

//hide/show horizontal lines
const hide_horizontal_lines = document.getElementById('hide-horizontal');

hide_horizontal_lines.addEventListener('click', () => {
    window.showHorizontalLines = !window.showHorizontalLines;

    hide_horizontal_lines.textContent = window.showHorizontalLines ? 'Hide Horizontal' : 'Show Horizontal';
    draw();
});

//hide/show vertical lines
const hide_vertical_lines = document.getElementById('hide-vertical');
hide_vertical_lines.addEventListener('click', () => {
    window.showVerticalLines = !window.showVerticalLines;
    
    hide_vertical_lines.textContent = window.showVerticalLines ? 'Hide Vertical' : 'Show Vertical';
    draw();
})