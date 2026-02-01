document.addEventListener("DOMContentLoaded", () => {

  const audio = document.getElementById("background-music");

  const startBtn = document.getElementById("start-btn");
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");

  const questionText = document.getElementById("question-text");
  const choiceBox = document.querySelector(".choice-box");
  const threedBox = document.querySelector(".threed-box");

  const volumeSlider = document.getElementById("volume-slider");
  const muteBtn = document.getElementById("mute-button");
  const icon = muteBtn.querySelector("i");

  let partnerName = "PIYU";
  let noCount = 0;

  // Volume
  audio.volume = volumeSlider.value;
  volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
  });

  muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    icon.className = audio.muted ? "fa fa-volume-off" : "fa fa-volume-up";
  });

  // Start
  startBtn.addEventListener("click", () => {
    audio.play().catch(() => {});
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
      <span class="love-text">Looks like a plan 💖</span><br>
      <span class="love-text">I knew you couldn’t resist 😏</span>
    `;
    choiceBox.style.display = "none";
    threedBox.classList.remove("hide");
  });

  // NO (cute, not aggressive)
  noBtn.addEventListener("click", () => {
    noCount++;

    if (noCount <= 2) {
      questionText.innerHTML += `<br><em>Bold choice 😌</em>`;
      noBtn.style.transform = `translateX(${Math.random() * 80 - 40}px)`;
    } else {
      noBtn.style.transform = `translateX(${Math.random() * 140 - 70}px)`;
      yesBtn.style.transform = "scale(1.08)";
    }
  });

});
