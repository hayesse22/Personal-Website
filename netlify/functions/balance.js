// Simple in-memory balance store (for demo, real apps use DB)
let userBalance = 1000; // start with $1000

exports.handler = async (event) => {
  const { action, amount } = JSON.parse(event.body || '{}') || {};
  
  if (action === 'get') {
    return {
      statusCode: 200,
      body: JSON.stringify({ balance: userBalance }),
    };
  }
  
  if (action === 'update') {
    const amt = Number(amount);
    if (isNaN(amt)) {
      return { statusCode: 400, body: 'Invalid amount' };
    }
    userBalance += amt;
    if (userBalance < 0) userBalance = 0;
    
    return {
      statusCode: 200,
      body: JSON.stringify({ balance: userBalance }),
    };
  }
  
  return { statusCode: 400, body: 'Bad request' };
};
