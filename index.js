let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["green", "red", "yellow", "blue"];
let started = false;
let level = 0;
let highScore = 0;

// Play sound for a color
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animate a button press
function animatePress(color) {
  let el = document.getElementById(color);
  el.classList.add("pressed");
  setTimeout(() => el.classList.remove("pressed"), 150);
}

// Next sequence level
function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = "Level " + level;

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  setTimeout(() => {
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
  }, 500);
}

// Check user input correctness
function checkAnswer(currentIndex) {
  if (userClickedPattern[currentIndex] === gamePattern[currentIndex]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 200);

    document.getElementById("level-title").textContent = "Game Over, Press Any Key or Tap to Restart";
    startOver();
  }
}

// Handle user clicks
function handleUserClick(color) {
  userClickedPattern.push(color);
  animatePress(color);
  playSound(color);
  checkAnswer(userClickedPattern.length - 1);
}

// Start or restart the game
function startGame() {
  if (!started) {
    level = 0;
    gamePattern = [];
    started = true;
    document.getElementById("level-title").textContent = "Level " + level;
    nextSequence();
  }
}

// Restart helper
function startOver() {
  if (level > highScore) {
    highScore = level;
    document.getElementById("high-score").textContent = "High Score: " + highScore;
  }
  started = false;
}

// Add click listeners to buttons
document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", () => {
    handleUserClick(button.id);
  });
  // Optional: keyboard accessibility for buttons (space/enter)
  button.addEventListener("keydown", e => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleUserClick(button.id);
    }
  });
});

// Start game on key press or tap anywhere
document.addEventListener("keydown", startGame);
document.addEventListener("touchstart", startGame);
