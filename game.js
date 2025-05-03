// Initialize variables (balance, health, deck) in localStorage if not set
if (!localStorage.getItem('balance')) {
  localStorage.setItem('balance', 100); // Starting balance (money)
}
if (!localStorage.getItem('health')) {
  localStorage.setItem('health', 20); // Starting health
}
if (!localStorage.getItem('deck')) {
  localStorage.setItem('deck', JSON.stringify(['Attack', 'Attack', 'Heal'])); // Starting deck
}

// Get saved values from localStorage
var balance = parseInt(localStorage.getItem('balance'));
var health = parseInt(localStorage.getItem('health'));
var deck = JSON.parse(localStorage.getItem('deck'));

// Setup game container and UI elements
var gameContainer = document.getElementById('game-container');

var statusDisplay = document.createElement('div');
statusDisplay.style.fontSize = '24px';
statusDisplay.style.marginBottom = '10px';
statusDisplay.textContent = `Balance: ${balance} | Health: ${health}`;

var actionButton = document.createElement('button');
actionButton.textContent = 'Start Battle';
actionButton.style.padding = '10px 20px';
actionButton.style.fontSize = '16px';

var deckDisplay = document.createElement('div');
deckDisplay.style.fontSize = '18px';
deckDisplay.style.marginBottom = '10px';
deckDisplay.textContent = 'Your Deck: ' + deck.join(', ');

// Function to draw a card from the deck
function drawCard() {
  var card = deck[Math.floor(Math.random() * deck.length)];
  return card;
}

// Function to resolve the battle logic
function resolveBattle(card) {
  var enemyHealth = 10; // Example enemy health
  var enemyCard = Math.random() > 0.5 ? 'Attack' : 'Defend';

  // Card logic
  if (card === 'Attack') {
    enemyHealth -= 5; // Deal damage to enemy
    if (enemyHealth <= 0) {
      alert('You defeated the enemy!');
      balance += 10; // Reward for winning
      localStorage.setItem('balance', balance);
      addCardToDeck();
    }
  } else if (card === 'Heal') {
    health += 5; // Heal player
    if (health > 20) health = 20; // Max health
    alert('You healed yourself!');
  } else {
    alert('You defended yourself!');
  }

  if (enemyHealth > 0) {
    health -= 3; // Enemy damage
    alert(`The enemy attacked you! Your health is now ${health}`);
  }

  localStorage.setItem('health', health);
  updateStatus();
  if (health <= 0) {
    alert('You lost! Game Over.');
    resetGame();
  }
}

// Add a new card to the deck after defeating an enemy
function addCardToDeck() {
  var newCard = Math.random() > 0.5 ? 'Attack' : 'Heal';
  deck.push(newCard);
  localStorage.setItem('deck', JSON.stringify(deck));
  deckDisplay.textContent = 'Your Deck: ' + deck.join(', ');
}

// Reset the game
function resetGame() {
  localStorage.setItem('health', 20);
  localStorage.setItem('balance', 100);
  localStorage.setItem('deck', JSON.stringify(['Attack', 'Attack', 'Heal']));
  health = 20;
  balance = 100;
  deck = ['Attack', 'Attack', 'Heal'];
  updateStatus();
}

// Update the displayed status (balance and health)
function updateStatus() {
  statusDisplay.textContent = `Balance: ${balance} | Health: ${health}`;
}

// Event listener for battle button
actionButton.onclick = function() {
  var drawnCard = drawCard();
  resolveBattle(drawnCard);
};

// Append elements to game container
gameContainer.appendChild(statusDisplay);
gameContainer.appendChild(deckDisplay);
gameContainer.appendChild(actionButton);
