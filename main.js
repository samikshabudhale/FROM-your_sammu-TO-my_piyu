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
  let hoverCount = 0;

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

    // ✅ smooth movement setup
    if (noButton) {
      noButton.style.position = "relative";
      noButton.style.transition = "transform 0.35s ease";
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

  // ✅ YES click
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

  // 😌 NO — slow playful tease (never disappears)
  function teaseNoButton() {
    hoverCount++;

    // ✅ First 5 tries: no movement (feels natural)
    if (hoverCount <= 5) return;

    // ✅ 6–10 tries: tiny slides left/right
    if (hoverCount <= 10) {
      const dir = hoverCount % 2 === 0 ? 1 : -1;
      noButton.style.transform = `translateX(${dir * 25}px)`;
      return;
    }

    // ✅ After 10 tries: slightly bigger slides, still not insane
    const dir = hoverCount % 2 === 0 ? 1 : -1;
    const slide = Math.min(80, 25 + (hoverCount - 10) * 5);
    noButton.style.transform = `translateX(${dir * slide}px)`;

    // ✅ Cute tease line only once
    if (hoverCount === 12) {
      questionText.innerHTML += `<br><span class="no-choice-text">Still thinking? 😌</span>`;
    }
  }

  noButton?.addEventListener("mouseenter", teaseNoButton);

  // If he clicks NO successfully, just tease (don’t break flow)
  noButton?.addEventListener("click", () => {
    questionText.innerHTML += `<br><span class="no-choice-text">Bold choice 😏</span>`;
  });

  clickButton.addEventListener("click", revealChoices);
});
