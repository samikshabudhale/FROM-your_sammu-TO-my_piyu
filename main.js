document.addEventListener("DOMContentLoaded", () => {

    const audio = document.getElementById("background-music");
    const startBtn = document.getElementById("start-btn");
    const yesBtn = document.getElementById("yes-btn");
    const noBtn = document.getElementById("no-btn");
    const choiceBox = document.querySelector(".choice-box");
    const questionText = document.getElementById("question-text");
    const threedBox = document.querySelector(".threed-box");
    const volumeSlider = document.getElementById("volume-slider");
    const muteBtn = document.getElementById("mute-button");
    const icon = muteBtn.querySelector("i");

    let partnerName = "PIYU";
    let noClicks = 0;

    // Volume control
    audio.volume = volumeSlider.value;

    volumeSlider.addEventListener("input", () => {
        audio.volume = volumeSlider.value;
    });

    muteBtn.addEventListener("click", () => {
        audio.muted = !audio.muted;
        icon.className = audio.muted ? "fa fa-volume-off" : "fa fa-volume-up";
    });

    // Start interaction
    startBtn.addEventListener("click", () => {
        audio.play().catch(()=>{});

        startBtn.style.display = "none";
        choiceBox.classList.remove("hide");

        questionText.innerHTML = `
            <span class="partner-name">${partnerName}</span><br>
            You and me, Valentine style?
        `;
    });

    // YES
    yesBtn.addEventListener("click", () => {
        questionText.innerHTML = `
            <span class="partner-name">${partnerName}</span><br>
            <span class="love-text">Knew it 😌💖</span><br>
            <span class="love-text">You’re stuck with me now</span>
        `;
        choiceBox.style.display = "none";
        threedBox.classList.remove("hide");
    });

    // NO (cute frustration)
    noBtn.addEventListener("click", () => {
        noClicks++;

        if (noClicks <= 2) {
            questionText.innerHTML += `<br><em>Bold choice 🤨</em>`;
            noBtn.style.transform = `translateX(${Math.random()*120 - 60}px)`;
        } else {
            noBtn.style.transform = `translateX(${Math.random()*200 - 100}px)`;
            yesBtn.style.transform = "scale(1.1)";
        }
    });

});
