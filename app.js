let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 10;
let ballSpeedY = 4;

let paddle1Y = 50;
const PADDLE_HEIGHT = 100;

function calculateMousePosition(e) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = e.clientX -rect.left - root.scrollLeft;
    let mouseY = e.clientY -rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };

}

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    let framesPerSecond = 30;
    setInterval(() => {
        moveEverything ();
        drawEverything();
    }, 1000/framesPerSecond);  
    canvas.addEventListener('mousemove', (e) => {
        let mousePos = calculateMousePosition(e);
        paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;
    });
}

function moveEverything () {
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
     if (ballX > canvas.width) {
         ballSpeedX = -ballSpeedX;
     }
     if (ballX < 0) {
         ballSpeedX = -ballSpeedX
     }

     if (ballY < 0) {
         ballSpeedY = -ballSpeedY;
     }
     if (ballY > canvas.height) {
         ballSpeedY = -ballSpeedY
     }
}

function drawEverything() {
   
    colorRect(0,0,canvas.width, canvas.height, 'black');
    colorRect(0, paddle1Y, 10, PADDLE_HEIGHT, 'white');
    colorCircle(ballX, ballY, 10, 'white')
}

function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();

}
function colorRect (leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);

}