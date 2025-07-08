exports.handler = async function (event, context) {
  const symbols = ['🍒', '🍋', '🔔', '🍉', '⭐', '7️⃣'];
  const result = [
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];

  const win = result.every((v) => v === result[0]);

  return {
    statusCode: 200,
    body: JSON.stringify({
      result,
      win,
      message: win ? '🎉 JACKPOT! 🎉' : 'Try again!',
    }),
  };
};


