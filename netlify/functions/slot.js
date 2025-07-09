const balanceStore = require('./balanceStore');
const reels = ['🍒', '🍋', '🍊', '🍉', '7️⃣', '⭐'];

exports.handler = async (event) => {
  const { bet } = JSON.parse(event.body || '{}');

  if (typeof bet !== 'number' || bet <= 0) {
    return { statusCode: 400, body: 'Invalid bet amount' };
  }

  const currentBalance = balanceStore.getBalance();

  if (bet > currentBalance) {
    return { statusCode: 400, body: 'Insufficient balance' };
  }

  balanceStore.updateBalance(-bet);

  const result = [
    reels[Math.floor(Math.random() * reels.length)],
    reels[Math.floor(Math.random() * reels.length)],
    reels[Math.floor(Math.random() * reels.length)],
  ];

  const isWin = result.every((val) => val === result[0]);
  const winAmount = isWin ? bet * 10 : 0;

  if (winAmount > 0) {
    balanceStore.updateBalance(winAmount);
  }

  const newBalance = balanceStore.getBalance();

  return {
    statusCode: 200,
    body: JSON.stringify({
      result,
      message: isWin ? `Jackpot! You won $${winAmount}` : 'Try again!',
      balance: newBalance
    })
  };
};

