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
    const highScoreValue = document.getElementById('highScoreValue');

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
        move: 20, // Speed of horizontal movement
        jump: -100 // Increased jump power for higher jumps
    };

    // Add this near the top of the file, after the colors object and before the ball object
    const initialState = {
        x: canvas.width / 2,
        y: canvas.height - 30,
        radius: 15,
        vx: 0,
        speed: 1.5,
        gravity: 0.2,
        jumpPower: -20,
        isJumping: false,
        timeRemaining: 30,
        lastTimestamp: 0
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

    // Create arrow elements using img tags
    const leftArrow = document.createElement('img');
    const rightArrow = document.createElement('img');

    // Create a container for the canvas and arrows
    const gameContainer = document.createElement('div');
    gameContainer.style.position = 'relative';
    gameContainer.style.width = 'fit-content';
    gameContainer.style.margin = '0 auto';

    // Move canvas into container
    canvas.parentNode.insertBefore(gameContainer, canvas);
    gameContainer.appendChild(canvas);

    // Set up the left arrow
    leftArrow.src = './left-arrow.svg';
    leftArrow.style.position = 'absolute';
    leftArrow.style.left = '12px';
    leftArrow.style.bottom = '20px';
    leftArrow.style.width = '30px';
    leftArrow.style.height = '30px';
    leftArrow.style.opacity = '0.5';
    leftArrow.style.display = 'none';
    leftArrow.style.zIndex = '1000';
    leftArrow.style.transition = 'opacity 0.2s ease';
    leftArrow.style.userSelect = 'none'; // Prevent text selection

    // Set up the right arrow
    rightArrow.src = './right-arrow.svg';
    rightArrow.style.position = 'absolute';
    rightArrow.style.right = '12px';
    rightArrow.style.bottom = '20px';
    rightArrow.style.width = '30px';
    rightArrow.style.height = '30px';
    rightArrow.style.opacity = '0.5';
    rightArrow.style.display = 'none';
    rightArrow.style.zIndex = '1000';
    rightArrow.style.transition = 'opacity 0.2s ease';
    rightArrow.style.userSelect = 'none'; // Prevent text selection

    // Append arrows to the game container
    gameContainer.appendChild(leftArrow);
    gameContainer.appendChild(rightArrow);

    function getHighScore() {
        const highScore = document.cookie.split('; ').find(row => row.startsWith('highScore='));
        return highScore ? parseInt(highScore.split('=')[1]) : 0;
    }

    function setHighScore(newScore) {
        // Set cookie to expire in 1 year
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        document.cookie = `highScore=${newScore};expires=${expiryDate.toUTCString()};path=/`;
    }

    function resetGame() {
        ball = {
            x: initialState.x,
            y: initialState.y,
            radius: initialState.radius,
            vx: initialState.vx,
            speed: initialState.speed,
            gravity: initialState.gravity,
            jumpPower: initialState.jumpPower,
            isJumping: initialState.isJumping,
            timeRemaining: initialState.timeRemaining,
            lastTimestamp: initialState.lastTimestamp
        };
        stars = [];
        obstacles = [];
        score = 0;
        gameOver = false;
        isPaused = true;
        scoreValue.textContent = '0';
        timeValue.textContent = '30';
        togglePauseButton.textContent = 'Start Game';
        togglePauseButton.style.display = 'inline-block';
        restartButton.style.display = 'none';
        gameStats.style.display = 'none';
        
        // Update high score display
        const currentHighScore = getHighScore();
        highScoreValue.textContent = currentHighScore;
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
            
            // Show the restart button when the game is over
            restartButton.style.display = 'inline-block';
            
            // Check and update high score
            const currentHighScore = getHighScore();
            if (score > currentHighScore) {
                setHighScore(score);
                highScoreValue.textContent = score;
                
                // Add high score celebration text
                ctx.fillStyle = colors.star;
                ctx.font = '24px Inter';
                ctx.fillText('New High Score!', canvas.width / 2, canvas.height / 2 + 80);
            }
            
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
                leftArrow.style.display = 'block';
                leftArrow.style.opacity = '1';
                rightArrow.style.display = 'none';
            } else if (event.key === 'ArrowRight') {
                ball.x = Math.min(canvas.width - ball.radius, ball.x + SPEED.move);
                rightArrow.style.display = 'block';
                rightArrow.style.opacity = '1';
                leftArrow.style.display = 'none';
            } else if (event.key === 'ArrowUp' && !ball.isJumping) {
                ball.isJumping = true;
                ball.y += SPEED.jump;
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

    // Update touch controls
    document.addEventListener('touchstart', (event) => {
        if (!isPaused && !gameOver) {
            const touch = event.touches[0];
            if (touch.clientX < canvas.width / 2) {
                ball.x = Math.max(ball.radius, ball.x - SPEED.move);
                leftArrow.style.display = 'block';
                leftArrow.style.opacity = '1';
                rightArrow.style.display = 'none';
            } else {
                ball.x = Math.min(canvas.width - ball.radius, ball.x + SPEED.move);
                rightArrow.style.display = 'block';
                rightArrow.style.opacity = '1';
                leftArrow.style.display = 'none';
            }
        }
    });

    // Update mouse controls
    canvas.addEventListener('mousedown', (event) => {
        if (!isPaused && !gameOver) {
            const mouseX = event.clientX - canvas.getBoundingClientRect().left;
            if (mouseX < canvas.width / 2) {
                ball.x = Math.max(ball.radius, ball.x - SPEED.move);
                leftArrow.style.display = 'block';
                leftArrow.style.opacity = '1';
                rightArrow.style.display = 'none';
            } else {
                ball.x = Math.min(canvas.width - ball.radius, ball.x + SPEED.move);
                rightArrow.style.display = 'block';
                rightArrow.style.opacity = '1';
                leftArrow.style.display = 'none';
            }
        }
    });

    // Update mouseup/touchend handlers to reset opacity
    document.addEventListener('mouseup', () => {
        leftArrow.style.opacity = '0.5';
        rightArrow.style.opacity = '0.5';

    });

    document.addEventListener('touchend', () => {
        leftArrow.style.opacity = '0.5';
        rightArrow.style.opacity = '0.5';
        leftArrow.style.display = 'none';
        rightArrow.style.display = 'none';
    });

    // Add keyup handler to reset opacity
    document.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            leftArrow.style.opacity = '0.5';
            rightArrow.style.opacity = '0.5';
            leftArrow.style.display = 'none';
            rightArrow.style.display = 'none';
        }
    });

    // Start the game
    gameLoop();
    initializeGame(); // Call the function to show the game section

    // Initialize high score display when the game loads
    const currentHighScore = getHighScore();
    highScoreValue.textContent = currentHighScore;
});

function initializeGame() {
    // Show the game section after the script is loaded
    document.getElementById('game-section').style.display = 'block';
} 