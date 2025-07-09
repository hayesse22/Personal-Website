let balance = 1000;

module.exports = {
  getBalance: () => balance,
  setBalance: (newBalance) => {
    balance = newBalance < 0 ? 0 : newBalance;
  },
  updateBalance: (delta) => {
    balance += delta;
    if (balance < 0) balance = 0;
    return balance;
  }
};
