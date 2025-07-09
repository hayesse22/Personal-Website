const reels = ['🍒', '🍋', '🍊', '🍉', '7️⃣', '⭐'];

let userBalance = 1000; // synced with balance.js or refactored for real DB

exports.handler = async (event) => {
  try {
    const { bet } = JSON.parse(event.body || '{}');
    if (typeof bet !== 'number' || bet <= 0) {
      return { statusCode: 400, body: 'Invalid bet amount' };
    }
    if (bet > userBalance) {
      return { statusCode: 400, body: 'Insufficient balance' };
    }
    
    userBalance -= bet;
    
    const result = [
      reels[Math.floor(Math.random() * reels.length)],
      reels[Math.floor(Math.random() * reels.length)],
      reels[Math.floor(Math.random() * reels.length)],
    ];
    
    const isWin = result.every((val) => val === result[0]);
    const winAmount = isWin ? bet * 10 : 0;
    userBalance += winAmount;
    
    const message = isWin ? `Jackpot! You won $${winAmount}` : 'Try again!';
    
    return {
      statusCode: 200,
      body: JSON.stringify({ result, message, balance: userBalance }),
    };
  } catch (error) {
    return { statusCode: 500, body: 'Server error' };
  }
};
