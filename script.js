const startBtn = document.getElementById('start-btn');
const optionsBtn = document.getElementById('options-btn');
const closeOptionsBtn = document.getElementById('close-options-btn');
const menuScreen = document.getElementById('menu-screen');
const optionsScreen = document.getElementById('options-screen');
const introScreen = document.getElementById('intro-screen');
const scrollWrapper = document.getElementById('scroll-wrapper');
const fadeOverlay = document.getElementById('fade-overlay');
const bgMusic = document.getElementById('bg-music');
const introMusic = document.getElementById('intro-music'); // Música del bosque/intro
const storyText = document.getElementById('story-text');
const nextStoryBtn = document.getElementById('next-story-btn');
const heroContainer = document.querySelector('.hero-intro-container');

const storyLines = [
    "En las tierras olvidadas del reino, la paz reinaba gracias al legendario Caballero Dorado...",
    "Pero las sombras comenzaron a extenderse desde las profundidades de la Cueva Oscura...",
    "Ahora, Shadow debe despertar, empuñar su espada y proteger el campo antes de que sea demasiado tarde."
];
let currentLine = 0;
let gamePlayable = false; // Controla si el personaje ya se puede mover
let playerPos = 10; // Posición inicial en porcentaje (izquierda)

// Activar música de menú al primer clic
document.addEventListener('click', () => {
    if (bgMusic.paused && introMusic.paused) {
        bgMusic.volume = 0.4;
        bgMusic.play().catch(() => {});
    }
}, { once: true });

optionsBtn.addEventListener('click', () => {
    optionsScreen.classList.remove('hidden');
});

closeOptionsBtn.addEventListener('click', () => {
    optionsScreen.classList.add('hidden');
});

// Transición al hacer clic en EMPEZAR
startBtn.addEventListener('click', () => {
    fadeOverlay.classList.add('active');

    // Cambiar música del menú a la música del bosque/introducción
    bgMusic.pause();
    bgMusic.currentTime = 0;
    introMusic.volume = 0.45;
    introMusic.play().catch(() => {});

    setTimeout(() => {
        menuScreen.classList.add('hidden');
        introScreen.classList.remove('hidden');
        storyText.innerText = storyLines[0];

        setTimeout(() => {
            fadeOverlay.classList.remove('active');
        }, 500);

    }, 1500);
});

// Avanzar en el pergamino y difuminarlo al final
nextStoryBtn.addEventListener('click', () => {
    currentLine++;
    if (currentLine < storyLines.length) {
        storyText.innerText = storyLines[currentLine];
    } else {
        // Desvanecer pergamino animado
        scrollWrapper.classList.add('fade-out');

        setTimeout(() => {
            gamePlayable = true; // Habilita el movimiento del personaje
        }, 800);
    }
});

// Movimiento del personaje con las teclas de flecha izquierda y derecha
document.addEventListener('keydown', (e) => {
    if (!gamePlayable) return; // Si el pergamino sigue activo, no se mueve

    if (e.key === 'ArrowRight') {
        playerPos += 2;
        if (playerPos > 90) playerPos = 90; // Límite derecho de la pantalla
        heroContainer.style.left = playerPos + '%';
    } else if (e.key === 'ArrowLeft') {
        playerPos -= 2;
        if (playerPos < 2) playerPos = 2; // Límite izquierdo de la pantalla
        heroContainer.style.left = playerPos + '%';
    }
});