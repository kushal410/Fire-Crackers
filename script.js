const gameArea = document.getElementById("game-area");
let selectedType = "chakra"; // default firecracker

const colors = ["red", "orange", "yellow", "blue", "green", "purple", "pink"];

// Firecracker sounds
const sounds = {
    chakra: new Audio("sounds/chakra.mp3"),
    rocket: new Audio("sounds/rocket.mp3"),
    sevenstar: new Audio("sounds/sevenstar.mp3"),
    bomb: new Audio("sounds/bomb.mp3")
};

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function createParticles(x, y) {
    const count = 20 + Math.floor(random(0, 20));
    for (let i = 0; i < count; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        const color = colors[Math.floor(random(0, colors.length))];
        particle.style.background = color;
        particle.style.left = x + "px";
        particle.style.top = y + "px";

        const angle = random(0, 2 * Math.PI);
        const distance = random(30, 120);
        particle.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--y', `${Math.sin(angle) * distance}px`);

        gameArea.appendChild(particle);

        setTimeout(() => particle.remove(), 1000);
    }
}

function createFirecracker(x, y, type) {
    const firecracker = document.createElement("div");
    firecracker.classList.add("firecracker");
    firecracker.style.left = x + "px";
    firecracker.style.top = y + "px";
    firecracker.style.background = colors[Math.floor(random(0, colors.length))];

    gameArea.appendChild(firecracker);

    createParticles(x, y);

    // Play sound
    if(sounds[type]) {
        sounds[type].currentTime = 0;
        sounds[type].play();
    }

    setTimeout(() => firecracker.remove(), 700);
}

// Click event
gameArea.addEventListener("click", (e) => {
    createFirecracker(e.clientX, e.clientY, selectedType);
});

// Touch support
gameArea.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    createFirecracker(touch.clientX, touch.clientY, selectedType);
});

// Navigation buttons
document.querySelectorAll(".firecracker-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        selectedType = btn.getAttribute("data-type");
    });
});
