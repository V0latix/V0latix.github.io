import { app } from './firebaseConfig.js';
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    getDocs
} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';

const db = getFirestore(app);

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

let score = 0;
let d;
let game;

document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}

function collision(newHead, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    // Fond du canvas
    ctx.fillStyle = "#f4f4f4";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dessiner le serpent
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "#4CAF50" : "#8BC34A";
        ctx.strokeStyle = "#388E3C";
        ctx.lineJoin = "round";
        ctx.lineWidth = 5;
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Dessiner la nourriture
    ctx.fillStyle = "#FF5722";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        endGame();
    }

    snake.unshift(newHead);

    // Afficher le score
    ctx.fillStyle = "#333";
    ctx.font = "45px Arial";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

function startGame() {
    snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };
    score = 0;
    d = null;
    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };
    game = setInterval(draw, 100);
}

function endGame() {
    // Afficher le bouton "Rejouer"
    document.getElementById("replayButton").style.display = "block";
    // Demander le nom du joueur
    let playerName = prompt("Entrez votre nom :");
    if (playerName) {
        updateLeaderboard(playerName, score);
    }
}

async function updateLeaderboard(playerName, newScore) {
    await addDoc(collection(db, "snake_leaderboard"), {
        name: playerName,
        score: newScore
    });
    await loadLeaderboard();
}

async function loadLeaderboard() {
    const leaderboardElement = document.getElementById("leaderboard");
    leaderboardElement.innerHTML = "<h2>Top 10 Scores</h2>";
    const q = query(collection(db, "snake_leaderboard"), orderBy("score", "desc"), limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((docSnap, index) => {
        const data = docSnap.data();
        leaderboardElement.innerHTML += `<p>${index + 1}. ${data.name}: ${data.score}</p>`;
    });
}

document.getElementById("replayButton").addEventListener("click", () => {
    document.getElementById("replayButton").style.display = "none";
    startGame();
});

// Initialiser le jeu
startGame();
loadLeaderboard();
