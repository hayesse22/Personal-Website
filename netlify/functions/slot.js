exports.handler = async (event) => {
  const { bet, currentBalance } = JSON.parse(event.body || '{}');

  if (typeof bet !== 'number' || bet <= 0 || typeof currentBalance !== 'number') {
    return { statusCode: 400, body: 'Invalid data' };
  }

  if (bet > currentBalance) {
    return { statusCode: 400, body: 'Insufficient balance' };
  }

  const reels = ['🍒', '🍋', '🍊', '🍉', '7️⃣', '⭐'];
  const result = [
    reels[Math.floor(Math.random() * reels.length)],
    reels[Math.floor(Math.random() * reels.length)],
    reels[Math.floor(Math.random() * reels.length)],
  ];

  const isWin = result.every((val) => val === result[0]);
  const winAmount = isWin ? bet * 10 : 0;
  const newBalance = currentBalance - bet + winAmount;

  return {
    statusCode: 200,
    body: JSON.stringify({
      result,
      message: isWin ? `Jackpot! You won $${winAmount}` : 'Try again!',
      balance: newBalance
    })
  };
};


