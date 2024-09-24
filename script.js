let credits = 1000; // Initial credits
const paytable = {
  1: { 3: 10, 4: 20, 5: 50 }, // 🍒
  2: { 3: 5, 4: 15, 5: 30 }, // 🍋
  3: { 3: 20, 4: 40, 5: 100 }, // 🍉
  4: { 3: 25, 4: 50, 5: 120 }, // 🍇
  5: { 3: 30, 4: 60, 5: 150 }, // 🍓
  6: { 3: 50, 4: 100, 5: 200 }, // 🍍
  7: { 3: 100, 4: 200, 5: 500 }, // 🍑
};

function updateCredits(amount) {
  credits += amount;
  document.querySelector(".credits").textContent = `Credits: ${credits}`;
}

function checkForWinningCombinations(reelValues) {
  const countMap = reelValues.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

  let payout = 0;

  Object.keys(countMap).forEach((key) => {
    const count = countMap[key];
    if (count >= 3) {
      payout += paytable[key][count]; // Add payout for this fruit based on the count
    }
  });

  return payout;
}

function spin(multiplierValue) {
  const notice = document.getElementById("notice");
  notice.innerHTML = "";
  const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3"),
    document.getElementById("reel4"),
    document.getElementById("reel5"),
  ];

  const fruitMap = {
    1: "🍒", // Cherry
    2: "🍋", // Lemon
    3: "🍉", // Watermelon
    4: "🍇", // Grapes
    5: "🍓", // Strawberry
    6: "🍍", // Pineapple
    7: "🍑", // Peach
  };

  let spinIntervals = [];
  let finalReelValues = [];

  // Deduct the bet amount based on the multiplier
  updateCredits(-multiplierValue);

  // Function to generate a random number between 1 and 7
  function getRandomNumber() {
    return Math.floor(Math.random() * 7) + 1;
  }

  // Start spinning each reel
  reels.forEach((reel, index) => {
    spinIntervals[index] = setInterval(() => {
      const randomNumber = getRandomNumber();
      reel.textContent = fruitMap[randomNumber]; // Display random fruit in the reel
    }, 100);

    setTimeout(() => {
      clearInterval(spinIntervals[index]); // Stop spinning
      const finalNumber = getRandomNumber();
      reel.textContent = fruitMap[finalNumber]; // Set final fruit symbol
      finalReelValues[index] = finalNumber;

      if (index === reels.length - 1) {
        // Once all reels stop, check for winning combinations
        const payout = checkForWinningCombinations(finalReelValues);
        if (payout > 0) {
          updateCredits(payout); // Add the payout to the credits
          notice.innerHTML = `You won ${payout} credits!`;
        } else {
          notice.innerHTML = "No win this time!";
        }
      }
    }, (index + 1) * 500); // Stagger reel stops
  });
}

function handleMultiplier(event, multiplierValue) {
  // Call spin function and pass the multiplier value
  spin(multiplierValue);
}
