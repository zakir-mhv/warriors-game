// Setting initial life of warriors
let playerLife = 100;
let computerLife = 100;


// Getting progress bars, buttons and logs
let playerBar = document.getElementById("player-bar");
let computerBar = document.getElementById("computer-bar");

let newGameButton = document.getElementById("new-game-button");
let controlButtons = document.getElementById("control-buttons");

let logsSection = document.getElementById("logs-section");
let logsList = document.getElementById("logs-list");


// When buttons clicked
function newGame() {
  // hiding new game button and showing other buttons
  newGameButton.classList.add("invisible");
  controlButtons.classList.remove("invisible");
  logsSection.classList.remove("invisible");
}

function attack() {
  let damage = Math.floor(Math.random() * 10 + 1);
  computerLife -= damage;
  computerAttack();
  updateLogs("Player Attack: ", "info", damage);
  checkGameOver();
  updateBars();
}

function specialAttack() {
  let damage = Math.floor(Math.random() * 20 + 1);
  computerLife -= damage;
  computerAttack();
  updateLogs("Player Special Attack: ", "info", damage);
  checkGameOver();
  updateBars();
}

function addLife() {
  let life = Math.floor(Math.random() * 5 + 1);
  playerLife += life;
  if (playerLife > 100) {
    playerLife = 100;
  } else {
    updateLogs("Player Add Life: ", "warning", life);
  }
  updateBars();
}

function computerAttack() {
  let damage = Math.floor(Math.random() * 15 + 1);
  playerLife -= damage;
  updateLogs("Computer Attack: ", "danger", damage);
}


// Checking if game is over
function checkGameOver() {
  if (playerLife <= 0) {
    if (confirm("YOU LOST!!! Do you want to restart the game?")) {
      playerLife = 100;
      computerLife = 100;
      // clear logs
      logsList.textContent = "";
    }
  } else if (computerLife <= 0) {
    if (confirm("YOU WON!!! Do you want to restart the game?")) {
      playerLife = 100;
      computerLife = 100;
      // clear logs
      logsList.textContent = "";
    }
  }
}


// Update progress bars and logs
function updateBars() {
  playerBar.textContent = `${playerLife}%`;
  computerBar.textContent = `${computerLife}%`;
  playerBar.style.width = `${playerLife}%`;
  computerBar.style.width = `${computerLife}%`;
}

function updateLogs(message, color, amount) { 
  // creating li element and adding classes to it
  let li = document.createElement("li");
  li.classList.add("list-group-item", "list-group-item-" + color, "d-flex", "justify-content-between", "align-items-center", "py-0");
  
  // creating span element and adding classes to it
  let span = document.createElement("span");
  span.classList.add("badge", "badge-" + color, "badge-pill");
  
  // creating text for li and span elements
  let logMessage = document.createTextNode(message);
  let logAmount = document.createTextNode(amount);
  
  // appending texts to span and li elements, and appending span itself to li element
  span.appendChild(logAmount);
  li.appendChild(logMessage);
  li.appendChild(span);

  // inserting li elements to ul containers in a way that last added is shown first on the list
  logsList.insertBefore(li, logsList.childNodes[0]);
}