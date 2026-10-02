# Wallet Watchlist problems

These are issues ops hit on the ledger and request handlers. On this branch the matching spots are tagged in the source. Search for `PROBLEM 1`, `PROBLEM 2`, or `PROBLEM 3`.

Work through them in the code, and make commits with clear messages as you go. You may rewrite the API in the stack you ship with. Keep the ledger behavior.

## 1. Anyone can add wallets (`PROBLEM 1`)

What we need: only the admin can add a wallet, and only with a non-empty wallet id. A missing `caller` must not be treated as admin.

What happens now:
- `addWallet` does not check `caller` against `admin`. An empty or missing id still lands on the list.
- The handler defaults `caller` to `"ops"`, which is also the ledger admin, so a request with no caller looks authorized.

Where to look:
- `src/ledger.js` - `addWallet`
- `src/handler.js` - `"add"`

## 2. Deposits and withdraws do not hold (`PROBLEM 2`)

What we need: amounts must be greater than 0. A deposit credits the shared treasury. Only a listed wallet can withdraw, and only up to remaining allowance. A successful withdraw cuts both treasury and remaining. Failed withdraws should be explicit results, not a crash that is then swallowed.

What happens now:
- `deposit` accepts `0`. `withdraw` always reports `ok` and does not cut remaining. Treasury is decremented, then `row.id` crashes when the wallet is missing, then the handler catches the crash and returns `{ ok: false }`.
- The handler turns a missing amount into `0` and still calls deposit or withdraw.

Where to look:
- `src/ledger.js` - `deposit`, `withdraw`
- `src/handler.js` - `"deposit"`, `"withdraw"`, `toNumber`

## 3. A missing wallet looks like remaining 0 (`PROBLEM 3`)

What we need: remaining allowance may reach `0` after withdraws. That must not look the same as "never listed". The watchlist should not be a process-wide list shared across ledgers.

What happens now:
- `allowance` returns `0` when the wallet was never added.
- `wallets` is a module-level array, so every `Ledger` instance shares the same rows.

Where to look:
- `src/ledger.js` - `wallets`, `allowance`
- `src/handler.js` - `"allowance"`
