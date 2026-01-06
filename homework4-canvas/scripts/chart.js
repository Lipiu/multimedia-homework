window.onload = function() {
    let canvas = document.getElementById('chartCanvas');
    let context = canvas.getContext('2d');

    let width = canvas.width;
    let height = canvas.height;

    let xIncrement = 150;
    let yIncrement = 100;
    let valueIncrement = 20;
    let textOffset = 5;

    window.intervalId = null;
    window.isRunning = false;
    

    let data = [];

    function startAnimation() {
    if (window.isRunning){ 
        return;
    }
    window.isRunning = true;
    window.intervalId = setInterval(() => {
        generateNewValue();
        draw();
    }, 1000);
}

function stopAnimation() {
    window.isRunning = false;
    clearInterval(window.intervalId);
    window.intervalId = null;
}

window.startAnimation = startAnimation;
window.stopAnimation = stopAnimation;
window.isRunning = isRunning;

    function drawVerticalLines()
    {
        context.strokeStyle = 'gray';
        context.lineWidth = 1;
        
        for(let i = 0; i< width; i += xIncrement)
        {
            context.beginPath();
            context.moveTo(i, 0);
            context.lineTo(i, height);
            context.stroke();
        }
    }

    function drawHorizontalLines()
    {
        context.strokeStyle = 'gray';
        context.lineWidth = 1;

        for (let i = 0; i < height; i += yIncrement)
        {
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(width, i);
            context.stroke();
        }
    }


    function drawChart()
    {
        context.strokeStyle = 'green';
        context.lineWidth = 5;

        context.beginPath();
        context.moveTo(0, height - data[0]);

        for (let i = 1; i < data.length; i++)
        {
            context.lineTo(i * valueIncrement, height - data[i]);
        }

        context.stroke();
    }

    function drawRandom(randomVal, color){
        context.strokeStyle = color;
        context.lineWidth = 5;

        context.lineJoin = 'round';
        context.lineCap = 'round';

        context.beginPath();
        context.moveTo(0, height - data[0]);

        for(let i = randomVal; i < data.length - randomVal; i += randomVal){
            const x1 = i * valueIncrement;
            const y1 = height - data[i];

            const x2 = (i + randomVal) * valueIncrement;
            const y2 = height - data[i + randomVal];

            const xc = (x1 + x2) / 2;
            const yc = (y1 + y2) / 2;

            context.quadraticCurveTo(x1,y1,xc,yc);
        }
        context.lineTo(
            (data.length - 1) * valueIncrement,
            height - data[data.length - 1]
        );
        context.stroke();
    }

    function drawVerticalLabels()
    {
        for (let i = 0; i < height; i += yIncrement)
        {
            context.strokeText(height - i, textOffset, i + 2 * textOffset);
        }
    }

    function drawHorizontalLabels()
    {
        for (let i = 0; i < width; i+=xIncrement)
        {
            context.strokeText(i, i + textOffset, height - textOffset);
        }
    }

    function generateRandomNumber()
    {
        return parseInt(Math.random() * height);
    }

    function generateData()
    {
        for (let i = 0; i <= width; i+= valueIncrement)
        {
            data[i/valueIncrement] = generateRandomNumber();
        }
    }

    function draw()
    {
        context.clearRect(0, 0, width, height);
        drawVerticalLines();
        drawRandom(5, "blue");
        drawRandom(7, "purple");
        drawRandom(6, "red");
        drawHorizontalLines();
        drawVerticalLabels();
        drawHorizontalLabels();
        drawChart();
        
    }

    function generateNewValue()
    {
        let newValue = generateRandomNumber();
        data.push(newValue);
        data.shift();
    }

    generateData();
    draw();
}