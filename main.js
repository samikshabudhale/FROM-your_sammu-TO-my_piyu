document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("background-music");
  const muteButton = document.getElementById("mute-button");
  const volumeSlider = document.getElementById("volume-slider");
  const icon = muteButton?.querySelector("i");

  const clickButton = document.querySelector(".click-box button");
  const choiceBox = document.querySelector(".choice-box");
  const threedBox = document.querySelector(".threed-box");
  const questionText = document.querySelector(".question-box h1");
  const yesButton = document.querySelector(".choice-box button:first-child");
  const noButton = document.querySelector(".choice-box button:last-child");
  const audioHint = document.querySelector(".audio-hint");

  let partnerName = "PIYU";

  // 🧸 Playful dodge settings
  let dodgeCount = 0;
  const maxDodges = 6; // how many times it dodges before giving up
  const moveDistance = 110; // how far it slides each dodge (px)

  // 🎵 Audio setup
  if (audio) audio.volume = parseFloat(volumeSlider?.value || "0.7");

  volumeSlider?.addEventListener("input", () => {
    if (!audio) return;
    audio.volume = parseFloat(volumeSlider.value);
    if (icon) icon.className = audio.volume === 0 ? "fa fa-volume-off" : "fa fa-volume-up";
  });

  muteButton?.addEventListener("click", () => {
    if (!audio) return;
    audio.muted = !audio.muted;
    if (icon) icon.className = audio.muted ? "fa fa-volume-off" : "fa fa-volume-up";
  });

  // ✨ Typewriter
  function typeWriterEffect(el, text, speed = 70) {
    if (!el) return;
    el.innerHTML = "";
    let i = 0;
    (function typing() {
      if (i < text.length) {
        el.innerHTML += text.charAt(i++);
        setTimeout(typing, speed);
      }
    })();
  }

  // 👉 Reveal choices (starts music)
  function revealChoices() {
    if (audioHint) audioHint.style.display = "none";

    if (audio) {
      audio.muted = false;
      audio.volume = parseFloat(volumeSlider?.value || "0.7");
      audio.play().catch(() => {});
    }

    clickButton.style.display = "none";
    choiceBox.classList.remove("hide");

    questionText.innerHTML = `
      <span class="partner-name">${partnerName}</span><br>
      <span class="typed-text"></span>
    `;

    setTimeout(() => {
      typeWriterEffect(document.querySelector(".typed-text"), "You and me, Valentine style?");
    }, 300);

    // ✅ Prepare the NO button for smooth movement
    if (noButton) {
      noButton.style.position = "relative";     // stays in layout, just slides
      noButton.style.transition = "transform 0.35s ease"; // smooth + not too fast
      noButton.style.willChange = "transform";
    }
  }

  // ❤️ Hearts
  function createHearts() {
    const container = document.createElement("div");
    container.className = "heart-container";
    document.body.appendChild(container);

    for (let i = 0; i < 30; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = Math.random() * 2 + 3 + "s";
      container.appendChild(heart);
    }

    setTimeout(() => container.remove(), 5000);
  }

  // ✅ YES
  yesButton?.addEventListener("click", () => {
    questionText.innerHTML = `
      <span class="partner-name">${partnerName}</span><br>
      <span class="love-text">Looks like a plan 💖</span><br>
      <span class="love-text">I knew you couldn’t resist 😏</span>
    `;
    choiceBox.style.display = "none";
    threedBox.classList.remove("hide");
    createHearts();
  });

  // 😌 NO (playful, slow dodge — not aggressive)
  function slowDodge() {
    dodgeCount++;

    // First 2 times: do nothing (feels natural)
    if (dodgeCount <= 2) return;

    // After that: gentle sliding left/right
    const direction = dodgeCount % 2 === 0 ? 1 : -1;
    const slide = Math.min(moveDistance, 70 + dodgeCount * 10); // increases slowly

    noButton.style.transform = `translateX(${direction * slide}px)`;

    // Optional tease text after a few dodges (not desperate)
    if (dodgeCount === 4) {
      questionText.innerHTML += `<br><span class="no-choice-text">Hmm… thinking too hard? 😌</span>`;
    }

    // After max dodges: bring it back (so it doesn't feel forced)
    if (dodgeCount >= maxDodges) {
      setTimeout(() => {
        noButton.style.transform = "translateX(0)";
      }, 500);
      dodgeCount = 2; // reset to keep it playful, not impossible
    }
  }

  // Trigger dodge when mouse gets close (but only after 2 tries)
  noButton?.addEventListener("mouseenter", slowDodge);

  // Still allow clicking "No" if he really wants
  noButton?.addEventListener("click", () => {
    // If he clicks No successfully, just tease lightly
    questionText.innerHTML += `<br><span class="no-choice-text">Bold choice 😏</span>`;
  });

  clickButton.addEventListener("click", revealChoices);
});
