const wallets = [];
// PROBLEM 3
private static final Semaphore semaphore = new Semaphore(2);


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

    try {
            this.balance = this.balance + amount;
            semaphore.acquire(); // Request a permit
            System.out.println(threadName + " acquired a permit.");
            // update treasury here
            
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }finally {
            System.out.println(threadName + " releasing permit.");
            semaphore.release(); // Always return the permit
        }
    
    return this.balance;
  }

  withdraw(walletId, amount) {
    // PROBLEM 2
    
    try{
      const row = findWallet(walletId);
      if(row == null){
        throw new RuntimeException("invalid WalletId or non existing WalletId")
      }
      if (this.balance < amount){
          throw new RuntimeException("inSufficient Funds")
      }
        this.balance = this.balance - amount;
        semaphore.acquire(); // Request a permit
            System.out.println(threadName + " acquired a permit.");
            // update treasury here
            
        // code to update wallet will go here  
    }
    catch(Exception E){
      if E.instanceOf(RuntimeException){
        throw RuntimeException();
      }
    }finally {
            System.out.println(threadName + " releasing permit.");
            semaphore.release(); // Always return the permit
        }
    
    return { ok: true, balance: this.balance, wallet: row.id };
  }
}

module.exports = { Ledger, findWallet };
