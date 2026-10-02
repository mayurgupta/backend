const http = require("http");
const { handle } = require("./handler");

function send(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api") {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      let body = {};
      try {
        body = raw ? JSON.parse(raw) : {};
      } catch (_error) {
        send(res, 400, { ok: false, error: "bad json" });
        return;
      }
      send(res, 200, handle(body.action, body));
    });
    return;
  }

  send(res, 404, { ok: false, error: "not found" });
});

const port = 3000;
server.listen(port, "127.0.0.1", () => {
  console.log("api on http://127.0.0.1:" + port);
});
