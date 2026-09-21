import test from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { createDemoHttpServer } from "../server.mjs";
import { createDemoPosts } from "../lib/demo-data.mjs";
import { readDemoFeed, readDemoThread } from "../lib/demo-reader.mjs";

test("feed previews disclose truncation; thread reads recover the complete original and parent attribution", () => {
  const snapshot = JSON.stringify(createDemoPosts());
  const feed = readDemoFeed();
  assert.equal(feed.items.length, 3);
  assert.equal(feed.hasMore, false);
  const preview = feed.items.find((item) => item.postId === "demo-building");
  assert.equal(preview.previewTruncated, true);
  const full = readDemoThread(preview.postId);
  assert.ok(full.post.text.length > preview.text.length);
  assert.equal(full.post.text, createDemoPosts().find((item) => item.postId === preview.postId).text);
  const thread = readDemoThread("demo-dinner");
  assert.equal(thread.totalReplyCount, 2);
  assert.equal(thread.replies[0].authorPublicHandle, "");
  assert.equal(thread.replies[1].parentReplyId, thread.replies[0].replyId);
  assert.equal(thread.replies[1].replyToAuthorName, "Taylor Reed");
  assert.match(thread.displayText, /replying to \*\*Taylor Reed\*\*/);
  assert.equal(JSON.stringify(createDemoPosts()), snapshot);
});

test("topic and absent-thread results stay honest", () => {
  assert.equal(readDemoFeed("PASTA").items.length, 1);
  assert.equal(readDemoFeed("astronomy").items.length, 0);
  assert.match(readDemoFeed("astronomy").displayText, /No fictional posts/);
  assert.equal(readDemoThread("missing").code, "not_found");
});

test("real HTTP MCP handshake, tool schemas, read results and unsupported writes", async (t) => {
  const http = createDemoHttpServer();
  http.listen(0, "127.0.0.1"); await once(http, "listening");
  t.after(() => { http.closeAllConnections(); http.close(); });
  const origin = `http://127.0.0.1:${http.address().port}`;
  const client = new Client({ name: "example-test", version: "1.0.0" });
  t.after(() => client.close());
  await client.connect(new StreamableHTTPClientTransport(new URL(`${origin}/mcp`)));
  const { tools } = await client.listTools();
  assert.deepEqual(tools.map((tool) => tool.name).sort(), ["get_feed_digest", "get_thread_context"]);
  for (const tool of tools) {
    assert.equal(tool.annotations.readOnlyHint, true);
    assert.equal(tool.annotations.destructiveHint, false);
    assert.equal(tool.annotations.openWorldHint, false);
    assert.ok(tool.outputSchema);
    assert.deepEqual(tool._meta.securitySchemes, [{ type: "noauth" }]);
  }
  const feed = await client.callTool({ name: "get_feed_digest", arguments: {} });
  assert.equal(feed.structuredContent.items.length, 3);
  assert.equal(feed.structuredContent.fictional, true);
  const thread = await client.callTool({ name: "get_thread_context", arguments: { postId: "demo-dinner" } });
  assert.equal(thread.structuredContent.totalReplyCount, 2);
  assert.equal(thread.structuredContent.hasMore, false);
  const missing = await client.callTool({ name: "get_thread_context", arguments: { postId: "missing" } });
  assert.equal(missing.isError, true);
  const invalid = await client.callTool({ name: "get_feed_digest", arguments: { topic: "a".repeat(121) } });
  assert.equal(invalid.isError, true);
  const write = await client.callTool({ name: "create_post", arguments: { text: "Do not publish" } });
  assert.equal(write.isError, true);
  assert.equal(readDemoFeed().items.length, 3);
  const crossOrigin = await fetch(`${origin}/health`, { headers: { Origin: "https://example.invalid" } });
  assert.equal(crossOrigin.status, 403);
  const health = await fetch(`${origin}/health`);
  assert.deepEqual(await health.json(), { ok: true, fictional: true, readOnly: true });
});

test("stdio entry point provides the same two read-only tools", async (t) => {
  const client = new Client({ name: "stdio-test", version: "1.0.0" });
  const transport = new StdioClientTransport({ command: process.execPath,
    args: [new URL("../server.mjs", import.meta.url).pathname, "--stdio"],
    env: { PATH: process.env.PATH || "/usr/bin:/bin" } });
  t.after(() => client.close());
  await client.connect(transport);
  assert.equal((await client.listTools()).tools.length, 2);
  const thread = await client.callTool({ name: "get_thread_context", arguments: { postId: "demo-dinner" } });
  assert.equal(thread.structuredContent.totalReplyCount, 2);
});
