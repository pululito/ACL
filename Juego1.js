const easyWords = [
    "gato", 
    "pelota", 
    "raton", 
    "teclado", 
    "pantalla",
    "casa",
    "perro",
    "mesa",
    "carro",
    "papel",
    "luna",
    "sol",
    "agua",
    "libro",
    "jardin",
    "ventana",
    "silla",
    "playa",
    "rio",
    "lapiz",
    "zapato",
    "fruta",
    "planta"
];

const intermediateWords = [
    "javascript", 
    "computadora", 
    "desarrollo", 
    "programación", 
    "internet",
    "corazón",
    "árbol",
    "fácil",
    "lápiz",
    "avión",
    "teléfono",
    "médico",
    "canción",
    "máquina",
    "fútbol",
    "azúcar",
    "océano",
    "país",
    "jardín",
    "péndulo",
    "bolígrafo",
    "música",
    "cárceles",
    "césped",
    "útil"
];


let currentWord = "";
let words = easyWords; // Inicialmente el nivel es fácil
let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
let timeLeft = 10;
let timerStarted = false; // Bandera para verificar si el temporizador ha iniciado
let timer; // Referencia al temporizador

function shuffleWord(word) {
    let shuffledWord = word.split('').sort(() => 0.5 - Math.random()).join('');
    return shuffledWord;
}

function updateScore() {
    document.getElementById("score").innerText = `Puntuación: ${score}`;
    document.getElementById("high-score").innerText = `Puntuación Máxima: ${highScore}`;
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("result").innerText = "¡Tiempo agotado!";
            resetGame();
        } else {
            document.getElementById("timer").innerText = `Tiempo: ${timeLeft}s`;
            timeLeft--;
        }
    }, 1000);
}

function resetGame() {
    timeLeft = 10;
    score = 0;
    timerStarted = false;
    clearInterval(timer); // Detiene el temporizador si se reinicia el juego
    localStorage.setItem('score', score);
    updateScore();
    currentWord = words[Math.floor(Math.random() * words.length)];
    document.getElementById("scrambled-word").innerText = shuffleWord(currentWord);
    document.getElementById("user-input").value = "";
    document.getElementById("timer").innerText = `Tiempo: 10s`; // Reinicia el texto del temporizador
}

function selectLevel() {
    const level = document.getElementById("level").value;
    if (level === "facil") {
        words = easyWords;
    } else if (level === "intermedio") {
        words = intermediateWords;
    }
    resetGame();
}

document.getElementById("user-input").addEventListener('input', function() {
    if (!timerStarted && this.value.length > 0) {
        timerStarted = true;
        startTimer();
    }
});

document.getElementById("scrambled-word").innerText = shuffleWord(currentWord);
updateScore();

function checkWord() {
    const userWord = document.getElementById("user-input").value;
    const result = document.getElementById("result");

    if (userWord.toLowerCase() === currentWord.toLowerCase()) {
        result.innerText = "¡Correcto!";
        result.style.color = "green";
        score += 10;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
        }
        localStorage.setItem('score', score);
        updateScore();
        currentWord = words[Math.floor(Math.random() * words.length)];
        document.getElementById("scrambled-word").innerText = shuffleWord(currentWord);
        document.getElementById("user-input").value = "";
        timeLeft = 10;
        clearInterval(timer);
        timerStarted = false; // Permite que el temporizador vuelva a iniciar con la nueva palabra
    } else {
        result.innerText = "Te equivocaste. Puntuación reiniciada.";
        result.style.color = "red";
        resetGame();
    }
}

