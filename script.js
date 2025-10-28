const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');

let isJumping = false;
let gravity = 0.9;
let playerBottom = 0;
let score = 0;
let gameInterval;
let obstacleGenerationInterval;

function jump() {
    if (!isJumping) {
        isJumping = true;
        let jumpHeight = 100; // Tinggi lompatan
        let upInterval = setInterval(() => {
            if (playerBottom < jumpHeight) {
                playerBottom += 5;
                player.style.bottom = playerBottom + 'px';
            } else {
                clearInterval(upInterval);
                let downInterval = setInterval(() => {
                    if (playerBottom > 0) {
                        playerBottom -= 5;
                        player.style.bottom = playerBottom + 'px';
                    } else {
                        clearInterval(downInterval);
                        isJumping = false;
                    }
                }, 20);
            }
        }, 20);
    }
}

function generateObstacle() {
    let obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    gameContainer.appendChild(obstacle);

    let obstaclePosition = gameContainer.offsetWidth;
    obstacle.style.right = obstaclePosition + 'px';

    let obstacleSpeed = 5; // Kecepatan rintangan

    let moveObstacle = setInterval(() => {
        if (obstaclePosition > -30) { // Jika rintangan masih terlihat
            obstaclePosition -= obstacleSpeed;
            obstacle.style.right = obstaclePosition + 'px';

            // Deteksi tabrakan
            let playerLeft = player.offsetLeft;
            let playerRight = player.offsetLeft + player.offsetWidth;
            let playerTop = gameContainer.offsetHeight - (player.offsetTop + player.offsetHeight); // Hitung dari bawah
            let playerBottomVal = playerBottom;

            let obstacleRight = gameContainer.offsetWidth - (obstacle.offsetLeft + obstacle.offsetWidth);
            let obstacleLeft = gameContainer.offsetWidth - obstaclePosition;
            let obstacleTop = gameContainer.offsetHeight - obstacle.offsetHeight;


            if (
                obstacleLeft < playerRight &&
                obstacleRight > playerLeft &&
                playerBottomVal < obstacle.offsetHeight
            ) {
                clearInterval(gameInterval);
                clearInterval(obstacleGenerationInterval);
                alert('Game Over! Score: ' + score);
                location.reload(); // Reload game
            }
        } else {
            clearInterval(moveObstacle);
            obstacle.remove();
            score++;
            scoreDisplay.textContent = 'Score: ' + score;
        }
    }, 20);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

function startGame() {
    gameInterval = setInterval(() => {
        // Logika game lainnya
    }, 20);

    obstacleGenerationInterval = setInterval(generateObstacle, 2000); // Buat rintangan setiap 2 detik
}

startGame();