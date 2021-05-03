let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 10;
let ballSpeedY = 4;

let player1Score = 0;
let player2Score = 0;
const WINNING_SCORE = 3;

let showingWinScreen = false;

let paddle1Y = 250;
let paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;

function calculateMousePosition(e) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = e.clientX -rect.left - root.scrollLeft;
    let mouseY = e.clientY -rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };

}
function handleMouseClick(e) {
    if (showingWinScreen) {
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false;
    }
}

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    let framesPerSecond = 30;
    setInterval(() => {
        moveEverything ();
        drawEverything();
    }, 1000/framesPerSecond);  

    canvas.addEventListener('mousedown', handleMouseClick)
    canvas.addEventListener('mousemove', (e) => {
        let mousePos = calculateMousePosition(e);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
    });
}

function ballReset() {
    if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) { 
        alert("Game Over")
        showingWinScreen = true;
    }
    ballSpeedX = -ballSpeedX
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function computerMovement() {
    let paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2)
    if(paddle2YCenter < ballY) {
        paddle2Y += 6; 
    }else if (paddle2YCenter > ballY + 35){
        paddle2Y -= 6;
    }
}

function moveEverything () {
    if (showingWinScreen) {
        return;
    }
    computerMovement();
    ballX += ballSpeedX;
    ballY += ballSpeedY;
     if (ballX > canvas.width) {
        if(ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;
            
            let deltaY = ballY -(paddle2Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35;

         } else {
        player1Score++; 
        ballReset();
        
         }
     }
     if (ballX < 0) {
         if(ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;
            let deltaY = ballY -(paddle1Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35;
         } else {
        player2Score++;   
        ballReset();
       
         }
     }

     if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
        
     }
     if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
     }
}

function drawEverything() {
    colorRect(0,0,canvas.width, canvas.height, 'black');
    if (showingWinScreen) {
        canvasContext.fillStyle = 'white';

        if (player1Score >= WINNING_SCORE) { 
            canvasContext.fillText("Player1 Wins!", 350, 200)

        } else if (player2Score >= WINNING_SCORE) {
            canvasContext.fillText("Computer Wins!", 350, 200)
        }
       
        canvasContext.fillText("Click to Continue.", 350, 400)
        return;
    }
    colorRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
    colorRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
    colorCircle(ballX, ballY, 10, 'white')

    canvasContext.fillText("Player 1: " +  player1Score, 100, 100)
    canvasContext.fillText("Computer: " +  player2Score, canvas.width - 130, 100)

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