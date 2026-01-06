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