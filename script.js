const gameArea = document.getElementById("game-area");
const boomSound = document.getElementById("boomSound");

gameArea.addEventListener("click", (e) => {
    const firecracker = document.createElement("div");
    firecracker.classList.add("firecracker");
    firecracker.style.left = e.clientX - 10 + "px";
    firecracker.style.top = e.clientY - 10 + "px";

    gameArea.appendChild(firecracker);
    boomSound.currentTime = 0;
    boomSound.play();

    setTimeout(() => {
        firecracker.remove();
    }, 600);
});
