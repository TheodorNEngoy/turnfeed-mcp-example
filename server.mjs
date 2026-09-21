import { createServer } from "node:http";
import { pathToFileURL } from "node:url";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createDemoMcpServer } from "./lib/mcp-server.mjs";

export function createDemoHttpServer() {
  const http = createServer(async (req, res) => {
    const localPort = http.address()?.port;
    const allowedHosts = [`127.0.0.1:${localPort}`, `localhost:${localPort}`];
    const allowedOrigins = allowedHosts.map((host) => `http://${host}`);
    if (!allowedHosts.includes(req.headers.host) || (req.headers.origin && !allowedOrigins.includes(req.headers.origin))) {
      res.writeHead(403).end("Local example only"); return;
    }
    if (req.url === "/health" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify({ ok: true, fictional: true, readOnly: true })); return;
    }
    if (req.url !== "/mcp") { res.writeHead(404).end("Not found"); return; }
    if (req.method !== "POST") { res.writeHead(405, { Allow: "POST" }).end("Use MCP POST requests"); return; }
    const server = createDemoMcpServer();
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true,
      enableDnsRebindingProtection: true, allowedHosts, allowedOrigins });
    res.on("close", () => { void transport.close(); void server.close(); });
    try {
      await server.connect(transport);
      await transport.handleRequest(req, res);
    } catch {
      if (!res.headersSent) res.writeHead(500).end("MCP request failed");
      else res.end();
    }
  });
  http.requestTimeout = 15_000;
  http.headersTimeout = 10_000;
  http.maxRequestsPerSocket = 100;
  return http;
}

async function main() {
  if (process.argv.includes("--stdio")) {
    await createDemoMcpServer().connect(new StdioServerTransport());
    return;
  }
  const port = Number(process.env.PORT || 8787);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("PORT must be an integer from 1 to 65535.");
  const server = createDemoHttpServer();
  server.listen(port, "127.0.0.1", () => console.log(`Fictional Turnfeed example: http://127.0.0.1:${port}/mcp`));
  for (const signal of ["SIGINT", "SIGTERM"]) process.once(signal, () => server.close());
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
