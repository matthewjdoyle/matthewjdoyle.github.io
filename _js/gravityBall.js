document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const scoreValue = document.getElementById('scoreValue');
    const timeValue = document.getElementById('timeValue');
    const togglePauseButton = document.getElementById('togglePauseButton');
    const restartButton = document.getElementById('restartButton');
    const addTimeButton = document.getElementById('addTimeButton');
    const gameStats = document.getElementById('gameStats');

    if (!canvas || !ctx) {
        console.error('Canvas or context not found');
        return;
    }

    console.log('Game initialized');
    console.log('Canvas:', canvas);
    console.log('Context:', ctx);

    // Game colors matching website theme
    const colors = {
        ball: '#3e2c48', // primary
        star: '#f9d0ff', // light purple
        obstacle: '#3e2c48', // primary
        background: '#1e1e1e', // surface
        text: '#ffffff' // text
    };

    // Speed constant
    const SPEED = {
        move: 15, // Speed of horizontal movement
        jump: -20 // Increased jump power for higher jumps
    };

    // Initial game state
    let ball = {
        x: canvas.width / 2,
        y: canvas.height - 30,
        radius: 15,
        vx: 0,
        speed: 1.5,
        gravity: 0.2,
        jumpPower: -20, // Updated jump power
        isJumping: false,
        timeRemaining: 30,
        lastTimestamp: 0
    };

    let stars = [];
    let score = 0;
    let obstacles = [];
    let gameOver = false;
    let isPaused = true;

    function resetGame() {
        ball = { ...initialState };
        stars = [];
        obstacles = [];
        score = 0;
        gameOver = false;
        isPaused = true;
        ball.timeRemaining = 30;
        ball.lastTimestamp = 0;
        scoreValue.textContent = '0';
        timeValue.textContent = '30';
        togglePauseButton.textContent = 'Start Game';
        togglePauseButton.style.display = 'inline-block';
        restartButton.style.display = 'none';
        gameStats.style.display = 'none';
    }

    // Generate stars
    function generateStars() {
        if (Math.random() < 0.05) { // 5% chance to generate a star
            stars.push({
                x: Math.random() * canvas.width,
                y: 0,
                radius: 5,
                color: colors.star,
            });
        }
    }

    // Move the ball
    function moveBall() {
        ball.y += ball.gravity; // Apply gravity

        // Check for ground collision
        if (ball.y + ball.radius > canvas.height) {
            ball.y = canvas.height - ball.radius; // Reset position
            ball.isJumping = false; // Reset jumping state
        }
    }

    // Draw the ball
    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.ball;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.stroke();
        ctx.closePath();
    }

    // Draw stars
    function drawStars() {
        stars.forEach((star, index) => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = colors.star;
            ctx.fill();
            ctx.closePath();

            // Move star down
            star.y += 2;

            // Check for collection
            if (Math.hypot(ball.x - star.x, ball.y - star.y) < ball.radius + star.radius) {
                stars.splice(index, 1); // Remove star
                score++; // Increase score
                scoreValue.textContent = score; // Update score display
            }

            // Remove star if it goes off screen
            if (star.y > canvas.height) {
                stars.splice(index, 1);
            }
        });
    }

    // Draw score
    function drawScore() {
        ctx.fillStyle = colors.text;
        ctx.font = '16px Arial';
        ctx.fillText(`Score: ${score}`, 8, 20);
    }

    function updateTimer(timestamp) {
        if (ball.lastTimestamp === 0) {
            ball.lastTimestamp = timestamp;
            return;
        }

        const deltaTime = (timestamp - ball.lastTimestamp) / 1000;
        ball.lastTimestamp = timestamp;
        ball.timeRemaining -= deltaTime;

        if (ball.timeRemaining <= 0) {
            gameOver = true;
            togglePauseButton.style.display = 'none';
            restartButton.style.display = 'inline-block';
            addTimeButton.style.display = 'none';
        }

        timeValue.textContent = Math.ceil(ball.timeRemaining);
    }

    // Game loop
    function gameLoop(timestamp) {
        if (gameOver) {
            ctx.fillStyle = 'rgba(30, 30, 30, 0.8)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = colors.text;
            ctx.font = '30px Inter';
            ctx.textAlign = 'center';
            ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
            ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
            return;
        }

        if (!isPaused) {
            updateTimer(timestamp);
            ctx.fillStyle = colors.background;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            generateStars();
            moveBall();
            drawBall();
            drawStars();
            drawScore();
        }

        requestAnimationFrame(gameLoop); // Call game loop again for the next frame
    }

    // Control the ball with keyboard
    document.addEventListener('keydown', (event) => {
        if (!isPaused && !gameOver) {
            if (event.key === 'ArrowLeft') {
                ball.x = Math.max(ball.radius, ball.x - SPEED.move);
            } else if (event.key === 'ArrowRight') {
                ball.x = Math.min(canvas.width - ball.radius, ball.x + SPEED.move);
            } else if (event.key === 'ArrowUp' && !ball.isJumping) {
                ball.isJumping = true;
                ball.y += SPEED.jump; // Allow jumping while moving
            }
        }
    });

    // Toggle pause state
    togglePauseButton.addEventListener('click', () => {
        isPaused = !isPaused; // Toggle pause state
        togglePauseButton.textContent = isPaused ? 'Start Game' : 'Pause Game'; // Update button text
        if (!isPaused) {
            gameStats.style.display = 'block';
            addTimeButton.style.display = 'none';
            ball.lastTimestamp = 0;
        } else {
            gameStats.style.display = 'none';
        }
    });

    // Add event listener for restart button
    restartButton.addEventListener('click', () => {
        resetGame(); // Call resetGame function to restart the game
        gameLoop(); // Restart the game loop after resetting
    });

    // Start the game
    gameLoop();
}); 