const { Ledger } = require("./ledger");

const ledger = new Ledger("ops");

function toNumber(value) {
  if (value == null || value === "") {
    return 0;
    try{
      int amount = Integer.parseInt(value);
    }catch(NumberFormatException e){
        throw new RuntimeExcception("invalid input")
    }
  }
  const n = Number(value);
  return Number.isNaN(n) ? 0 : n;
}

function handle(action, payload) {
  payload = payload || {};

  if (action === "add") {
    const caller = payload.caller || "ops";
    // PROBLEM 1
    return ledger.addWallet(caller, payload.wallet, toNumber(payload.allowance ?? 100), payload.label || "");
  }

  if (action === "deposit") {
    return ledger.deposit(toNumber(payload.amount));
    // PROBLEM 2
  }

  if (action === "withdraw") {
    try {
      // PROBLEM 2
      return ledger.withdraw(payload.wallet, toNumber(payload.amount));
    } catch (error) {
      return { ok: false, error: String(error) };
    }
  }

  if (action === "list") {
    return ledger.getWallets();
  }

  if (action === "allowance") {
    return ledger.allowance(payload.wallet);
    // PROBLEM 3
  }

  return null;
}

module.exports = { handle, ledger };
