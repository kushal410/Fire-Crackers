const gameArea = document.getElementById("game-area");
const boomSound = document.getElementById("boomSound");

const colors = ["red", "orange", "yellow", "blue", "green", "purple", "pink"];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function createParticles(x, y) {
    const count = 20 + Math.floor(random(0, 20)); // more particles
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

function createFirecracker(x, y) {
    const firecracker = document.createElement("div");
    firecracker.classList.add("firecracker");
    firecracker.style.left = x + "px";
    firecracker.style.top = y + "px";
    firecracker.style.background = colors[Math.floor(random(0, colors.length))];

    gameArea.appendChild(firecracker);
    boomSound.currentTime = 0;
    boomSound.play();

    createParticles(x, y);

    setTimeout(() => firecracker.remove(), 700);
}

gameArea.addEventListener("click", (e) => {
    createFirecracker(e.clientX, e.clientY);
});

// Mobile touch support
gameArea.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    createFirecracker(touch.clientX, touch.clientY);
});
