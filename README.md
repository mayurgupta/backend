# Wallet Watchlist

Backend API in JavaScript.

We have turned several problems we face in practice into a problem review so we can see how you think. Please download the project, check out the `problems` branch, open `PROBLEMS.md`, and make commits with clear messages as you work through them.

You may rewrite the API in the stack you ship with. Keep the ledger behavior. We care about how you work through the problems, not whether you stay in these files.

In the meeting, walk us through your approach, including your assumptions, tradeoffs, and the solution you would choose.

## Start here

You are on **`main`**.

**Check out `problems` for the current problem list:**

```bash
git checkout problems
```

Then open **`PROBLEMS.md`**.

## Run

```bash
node src/server.js
```

POST JSON to `http://127.0.0.1:3000/api` with an `action` of `add`, `deposit`, `withdraw`, `list`, or `allowance`.

## What is in the codebase

- `src/ledger.js` - watchlist and treasury balance
- `src/handler.js` - request handling
- `src/server.js` - HTTP API
