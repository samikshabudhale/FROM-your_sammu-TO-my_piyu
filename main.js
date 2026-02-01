document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("background-music");
    const muteButton = document.getElementById("mute-button");
    const volumeSlider = document.getElementById("volume-slider");
    const icon = muteButton ? muteButton.querySelector("i") : null;

    const clickButton = document.querySelector(".click-box button");
    const choiceBox = document.querySelector(".choice-box");
    const threedBox = document.querySelector(".threed-box");
    const questionText = document.querySelector(".question-box h1");
    const yesButton = document.querySelector(".choice-box button:first-child");
    const noButton = document.querySelector(".choice-box button:last-child");
    const audioHint = document.querySelector(".audio-hint");

    let partnerName = "PIYU";
    let noClickCount = 0;

    // ✅ Initial audio setup
    if (audio) {
        audio.volume = parseFloat(volumeSlider?.value || "0.7");
        audio.muted = false;
    }

    // ✅ Volume slider
    if (volumeSlider && audio) {
        volumeSlider.addEventListener("input", () => {
            audio.volume = parseFloat(volumeSlider.value);
            if (icon) icon.className = audio.volume === 0 ? "fa fa-volume-off" : "fa fa-volume-up";
        });
    }

    // ✅ Mute button
    if (muteButton && audio) {
        muteButton.addEventListener("click", () => {
            audio.muted = !audio.muted;
            if (icon) icon.className = audio.muted ? "fa fa-volume-off" : "fa fa-volume-up";
        });
    }

    // Typewriter effect
    function typeWriterEffect(element, text, speed = 70) {
        if (!element) return;
        element.innerHTML = "";
        let i = 0;

        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }

        typing();
    }

    // ✅ Reveal choices (starts music)
    function revealChoices() {
        if (audioHint) audioHint.style.display = "none";

        if (audio) {
            audio.muted = false;
            audio.volume = parseFloat(volumeSlider?.value || "0.7");
            audio.play().catch(() => {});
        }

        if (clickButton) clickButton.style.display = "none";
        if (choiceBox) choiceBox.classList.remove("hide");

        if (questionText) {
            questionText.innerHTML = `
                <span class="partner-name">${partnerName}</span><br>
                <span class="typed-text"></span>
            `;
            const typedText = document.querySelector(".typed-text");
            setTimeout(() => {
                typeWriterEffect(typedText, "You and me, Valentine style?");
            }, 300);
        }
    }

    // Hearts animation
    function createHearts() {
        const heartContainer = document.createElement("div");
        heartContainer.className = "heart-container";
        document.body.appendChild(heartContainer);

        for (let i = 0; i < 30; i++) {
            const heart = document.createElement("div");
            heart.className = "heart";
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = Math.random() * 2 + 3 + "s";
            heartContainer.appendChild(heart);
        }

        setTimeout(() => heartContainer.remove(), 5000);
    }

    // ✅ YES click
    if (yesButton) {
        yesButton.addEventListener("click", () => {
            if (questionText) {
                questionText.innerHTML =
                    `<span class="partner-name">${partnerName}</span><br>` +
                    `<span class="love-text">Looks like a plan 💖</span><br>` +
                    `<span class="love-text">I knew you couldn’t resist 😏</span>`;
            }

            if (choiceBox) choiceBox.style.display = "none";
            if (threedBox) threedBox.classList.remove("hide");

            createHearts();
        });
    }

    // ✅ NO click (shrink NO + grow YES)
    if (noButton && yesButton) {
        noButton.addEventListener("click", function () {
            noClickCount++;

            if (noClickCount < 5) {
                const newNoSize = 16 - noClickCount * 2;
                const newYesSize = 18 + noClickCount * 5;

                noButton.style.fontSize = `${newNoSize}px`;
                noButton.style.padding = `${newNoSize / 2}px ${newNoSize}px`;

                yesButton.style.fontSize = `${newYesSize}px`;
                yesButton.style.padding = `${newYesSize / 2}px ${newYesSize}px`;
            } else {
                noButton.style.display = "none";
                if (questionText) {
                    questionText.innerHTML += `<br><span class="no-choice-text">Did you really think you had a choice? 🤭</span>`;
                }
            }
        });
    }

    // Start button
    if (clickButton) {
        clickButton.addEventListener("click", revealChoices);
    }
});
