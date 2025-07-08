const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public')); // to serve frontend files from /public

// Slot machine symbols
const symbols = ['🍒', '🍋', '🔔', '🍉', '⭐', '7️⃣'];

app.get('/api/spin', (req, res) => {
  const result = [
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)]
  ];

  const win = result.every((v) => v === result[0]);

  res.json({
    result,
    win,
    message: win ? '🎉 JACKPOT! 🎉' : 'Try again!'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

