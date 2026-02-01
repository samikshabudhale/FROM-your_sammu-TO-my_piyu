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

  // ✅ If the button isn't found, nothing can work
  if (!clickButton || !choiceBox || !questionText) {
    console.log("Missing required elements:", { clickButton, choiceBox, questionText });
    return;
  }

  let partnerName = "PIYU";
  let noClickCount = 0;

  // ---------------------------
  // Audio controls
  // ---------------------------
  if (audio && volumeSlider) {
    audio.volume = parseFloat(volumeSlider.value || "0.7");

    volumeSlider.addEventListener("input", () => {
      audio.volume = parseFloat(volumeSlider.value || "0.7");
      if (icon && !audio.muted) {
        icon.className = audio.volume === 0 ? "fa fa-volume-off" : "fa fa-volume-up";
      }
    });
  }

  if (audio && muteButton) {
    muteButton.addEventListener("click", () => {
      audio.muted = !audio.muted;
      if (icon) icon.className = audio.muted ? "fa fa-volume-off" : "fa fa-volume-up";
    });
  }

  // ---------------------------
  // Typewriter effect
  // ---------------------------
  function typeWriterEffect(element, text, speed = 60) {
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

  // ---------------------------
  // Click to reveal choices (and start music)
  // ---------------------------
  function revealChoices() {
    if (audio) {
      if (volumeSlider) audio.volume = parseFloat(volumeSlider.value || "0.7");
      audio.play().catch(() => {});
    }

    clickButton.style.display = "none";
    choiceBox.classList.remove("hide");

    // Show name + typed line
    questionText.innerHTML = `<span class="partner-name">${partnerName}</span><br><span class="typed-text"></span>`;
    const typedTextElement = document.querySelector(".typed-text");
    setTimeout(() => {
      typeWriterEffect(typedTextElement, "You and me, Valentine style?");
    }, 200);
  }

  // Attach click
  clickButton.addEventListener("click", revealChoices);

  // ---------------------------
  // Yes
  // ---------------------------
  if (yesButton) {
    yesButton.addEventListener("click", () => {
      questionText.innerHTML =
        `<span class="partner-name">${partnerName}</span><br>` +
        `<span class="love-text">Looks like a plan 💖</span><br>` +
        `<span class="love-text">I knew you couldn’t resist 😏</span>`;

      choiceBox.style.display = "none";
      if (threedBox) threedBox.classList.remove("hide");
    });
  }

  // ---------------------------
  // No (shrink + grow yes, fun mode)
  // ---------------------------
  if (noButton && yesButton) {
    noButton.addEventListener("click", () => {
      noClickCount++;

      if (noClickCount <= 6) {
        const newNoSize = Math.max(10, 18 - noClickCount * 2);
        const newYesSize = 18 + noClickCount * 4;

        noButton.style.fontSize = `${newNoSize}px`;
        noButton.style.padding = `${newNoSize / 2}px ${newNoSize}px`;

        yesButton.style.fontSize = `${newYesSize}px`;
        yesButton.style.padding = `${newYesSize / 2}px ${newYesSize}px`;
      } else {
        // after many tries, tease (don't instantly remove)
        questionText.innerHTML += `<br><span class="no-choice-text">Okay okay… you’re persistent 😌</span>`;
      }
    });
  }
});
