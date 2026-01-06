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