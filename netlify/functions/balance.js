// Simple in-memory balance store (for demo, real apps use DB)
const balanceStore = require('./balanceStore');

exports.handler = async (event) => {
  const { action, amount } = JSON.parse(event.body || '{}');

  if (action === 'get') {
    return {
      statusCode: 200,
      body: JSON.stringify({ balance: balanceStore.getBalance() })
    };
  }

  if (action === 'update') {
    const amt = Number(amount);
    if (isNaN(amt)) {
      return { statusCode: 400, body: 'Invalid amount' };
    }
    const newBalance = balanceStore.updateBalance(amt);
    return {
      statusCode: 200,
      body: JSON.stringify({ balance: newBalance })
    };
  }

  return { statusCode: 400, body: 'Bad request' };
};

