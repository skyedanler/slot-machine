let credits = 1000; // Initial credits

const fruitMap = {
  1: "🍒", // Cherry
  2: "🍋", // Lemon
  3: "🍉", // Watermelon
  4: "🍇", // Grapes
  5: "🍓", // Strawberry
  6: "🍍", // Pineapple
  7: "🍑", // Peach
};

const paytable = [
  {
    combination: { 1: 3, 7: 2 }, // 3 cherries and 2 peaches
    payout: 200,
  },
  {
    combination: { 3: 3, 6: 2 }, // 3 watermelons and 2 pineapples
    payout: 150,
  },
  {
    combination: { 5: 5 }, // 5 strawberries
    payout: 500,
  },
  {
    combination: { 4: 4 }, // 4 grapes
    payout: 120,
  },
  {
    combination: { 1: 3 }, // 3 cherries
    payout: 50,
  },
  {
    combination: { 2: 3 }, // 3 lemons
    payout: 30,
  },
  {
    combination: { 1: 2 },
    payout: 5,
  },
  {
    combination: { 2: 2 },
    payout: 5,
  },
  {
    combination: { 3: 2 },
    payout: 5,
  },
  {
    combination: { 4: 2 },
    payout: 5,
  },
  {
    combination: { 5: 2 },
    payout: 5,
  },
  {
    combination: { 6: 2 },
    payout: 5,
  },
  {
    combination: { 7: 2 },
    payout: 5,
  },
];

// Function to print paytable on the page
const printPaytable = () => {
  const paytableDiv = document.getElementById("paytable");
  let html = "";

  paytable.forEach((entry) => {
    // Create the combination string with repeated fruits
    const combinationText = Object.entries(entry.combination)
      .map(([fruitNumber, count]) => fruitMap[fruitNumber].repeat(count))
      .join(" ");

    html += `
        <div class="paytable-entry">
          <p class="payout">${entry.payout}</p>
          <div class="fruit-combination">${combinationText}</div>
        </div>
      `;
  });

  paytableDiv.innerHTML = html;
};

// Call this function to print paytable when the page loads
document.addEventListener("DOMContentLoaded", () => {
  printPaytable();
});

const updateCredits = (amount) => {
  credits += amount;
  if (credits > 0) {
    document.querySelector(".credits").textContent = `Credits: ${credits}`;
  } else {
    // Set credits to 0 if they go below 0
    credits = 0;
    document.querySelector(".credits").textContent =
      "You're out of credits. Go home!";

    // Set game over class on body
    document.body.classList.add("game-over");

    // Show the "Replay" button
    const replayButton = document.createElement("button");
    replayButton.textContent = "Replay";
    replayButton.classList.add("replay");
    replayButton.onclick = resetGame;
    document.querySelector(".choices").appendChild(replayButton);
  }
};

// Function to update message to gambler
const updateMessage = (message) => {
  noticeElement = document.getElementById("notice");
  noticeElement.innerHTML = message;
};

// Reset the game by setting credits back to 1000
const resetGame = () => {
  credits = 1000;
  document.querySelector(".credits").textContent = `Credits: ${credits}`;

  // Reset message
  updateMessage("");

  document.body.classList.remove("game-over");
  replayButton.remove();
};

const checkForWinningCombinations = (reelValues, multiplierValue) => {
  const countMap = reelValues.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

  let payout = 0;

  // Loop through the paytable and check if the combination matches
  paytable.forEach((entry) => {
    let match = true;
    Object.entries(entry.combination).forEach(([fruitNumber, count]) => {
      if (countMap[fruitNumber] !== count) {
        match = false;
      }
    });

    if (match) {
      payout += entry.payout * (multiplierValue / 20); // Scale payout by multiplier
    }
  });

  return payout;
};

const spin = (multiplierValue = 20) => {
  const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3"),
    document.getElementById("reel4"),
    document.getElementById("reel5"),
  ];

  updateMessage("Spinning...");
  disableButtons(); // Disable multiplier buttons while spinning

  let spinIntervals = [];
  let finalReelValues = [];

  updateCredits(-multiplierValue); // Deduct the bet amount based on the multiplier

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 7) + 1;
  };

  // Start spinning each reel
  reels.forEach((reel, index) => {
    // Spin each reel by updating the displayed fruit symbol
    spinIntervals[index] = setInterval(() => {
      const randomNumber = getRandomNumber();
      reel.textContent = fruitMap[randomNumber]; // Display random fruit in the reel
    }, 100); // Every 100ms, change the fruit to create the spinning effect

    // Stop spinning after a delay (stagger each reel stop)
    setTimeout(() => {
      clearInterval(spinIntervals[index]); // Stop spinning
      const finalNumber = getRandomNumber();
      reel.textContent = fruitMap[finalNumber]; // Set final fruit symbol
      finalReelValues[index] = finalNumber;

      // If it's the last reel, check for winning combinations
      if (index === reels.length - 1) {
        const payout = checkForWinningCombinations(
          finalReelValues,
          multiplierValue
        );
        if (payout > 0) {
          updateCredits(payout); // Add the payout to the credits
          updateMessage(`You won ${payout} credits!`);
        } else {
          updateMessage("No win this time!");
        }
        enableButtons(); // Re-enable buttons after spin completes
      }
    }, (index + 1) * 300); // Stagger reel stops, stopping one by one
  });
};

// Disable multiplier buttons
const disableButtons = () => {
  const buttons = document.querySelectorAll(".multiplier");
  buttons.forEach((button) => {
    button.disabled = true;
  });
};

// Re-enable multiplier buttons
const enableButtons = () => {
  const buttons = document.querySelectorAll(".multiplier");
  buttons.forEach((button) => {
    button.disabled = false;
  });
};

const handleMultiplier = (event, multiplierValue) => {
  // Get all elements with the class 'multiplier'
  const buttons = document.getElementsByClassName("multiplier");

  // Loop over all multiplier buttons and remove the 'selected' class
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("current-bet");
  }

  // Add the 'selected' class to the clicked element
  const clickedButton = event.target;
  clickedButton.classList.add("current-bet");

  // Do something with the multiplier value
  console.log("Multiplier value:", multiplierValue);

  // Call spin function and pass the multiplier value
  spin(multiplierValue);
};
