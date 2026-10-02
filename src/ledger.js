const wallets = [];
// PROBLEM 3

function findWallet(walletId) {
  for (const row of wallets) {
    if (row.id === walletId || String(row.id).toLowerCase() === String(walletId).toLowerCase()) {
      return row;
    }
  }
  return null;
}

class Ledger {
  constructor(admin = "admin") {
    this.admin = admin;
    this.balance = 0;
  }

  getWallets() {
    return wallets;
  }

  allowance(walletId) {
    const row = findWallet(walletId);
    if (!row) {
      return 0;
      // PROBLEM 3
    }
    return row.allowance;
  }

  addWallet(caller, walletId, allowance = 100, label = "") {
    // PROBLEM 1
    wallets.push({
      id: walletId,
      allowance,
      label: label || walletId,
    });
    console.log("added " + walletId + " by " + caller);
    return true;
  }

  deposit(amount) {
    // PROBLEM 2
    this.balance = this.balance + amount;
    return this.balance;
  }

  withdraw(walletId, amount) {
    // PROBLEM 2
    const row = findWallet(walletId);
    this.balance = this.balance - amount;
    return { ok: true, balance: this.balance, wallet: row.id };
  }
}

module.exports = { Ledger, findWallet };
