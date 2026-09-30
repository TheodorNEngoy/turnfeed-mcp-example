# Turnfeed MCP example

Read a social feed, open a thread, and work on a reply inside an AI conversation.

This small example uses **real feed and reply formatting code from [Turnfeed](https://turnfeedapp.com)**, a social feed inside ChatGPT and Codex. It demonstrates how an MCP server supplies structured social context while the host handles questions, summaries and private drafting in normal conversation.

**All people and posts here are fictional.** This is a read-only educational example, not the complete Turnfeed application or a connection to its live community. It cannot publish, sign in, or access anyone's account. The two example tool schemas are intentionally smaller than the hosted product's contracts.

## Run it

Use Node.js 22. No API key, database, model API call or paid service is needed for local execution.

```sh
npm ci
npm test
npm run demo
npm start
```

`npm run demo` prints the feed and a full thread without running a model. `npm start` serves Streamable HTTP MCP at **http://127.0.0.1:8787/mcp** and health at **http://127.0.0.1:8787/health**. It listens on loopback only. Set `PORT` to use another port.

For an MCP client supporting local processes, configure a stdio server:

```json
{
  "command": "node",
  "args": ["/absolute/path/turnfeed-mcp-example/server.mjs", "--stdio"]
}
```

For ChatGPT, use the [developer-mode connection instructions](https://developers.openai.com/plugins/deploy/connect-chatgpt). A local stdio/HTTP server can be connected through Secure MCP Tunnel if available to your account. This repository does not create a tunnel or configure a subscription. Keep the loopback Host/Origin protections; a public reverse proxy would need its own reviewed configuration. No native ChatGPT result is claimed for this standalone example yet.

## Try the conversation

Select only the example connection so that its fictional tools are distinct from the hosted Turnfeed plugin.

1. “Show the fictional feed.”
2. “Open River's dinner thread and show the replies.”
3. “Who replied to Taylor, and what did they suggest?”
4. “Draft two short questions for Taylor about when to add the peas. Keep them private.”
5. “Make the second option friendlier.”

The first two steps retrieve data. The remaining steps use context already in the conversation. A request to publish should explain that this read-only example cannot do that.

The dinner thread includes a reply to another reply:

> **Taylor Reed**
>
> I stir the peas in just before the pasta is ready.
>
> **Casey Lane** · @casey_demo
>
> ↳ replying to **Taylor Reed**
>
> Taylor, I use that timing too. Extra lemon at the end helps.

## What is included

| Piece | Purpose |
| --- | --- |
| `lib/feed-presentation.mjs` | Unmodified Turnfeed formatting module: quoted text, identity labels, timestamps, previews, nested reply attribution and related pure formatters. |
| `lib/demo-reader.mjs` | Small read-only adapter for a fixed fictional fixture. |
| `lib/mcp-server.mjs` | Two annotated MCP tools with explicit input and output schemas. |
| `server.mjs` | Local HTTP and stdio entry points using the official MCP SDK. |
| `test/` | Original formatter regression tests plus example transport and context tests. |

`get_feed_digest` returns three posts or a case-insensitive substring match on post text. A long post has `previewTruncated: true`. `get_thread_context` returns the complete original post and every reply, including explicit parent attribution. All dates use a fixed demo clock; these are not fresh community activity.

The example has no persistence, OAuth, publishing, moderation operations, private groups, production search/ranking, pagination, media ingestion or account system. Those omissions are deliberate. **It is not a drop-in replacement for Turnfeed's server.** See [the architecture and tool contract](docs/architecture.md).

## Build on it

Use the formatter in your own project or change the fictional data to explore conversational social interfaces. If you introduce private data or writes, implement and verify server-side authentication, authorization, exact target selection, idempotency and appropriate confirmation before connecting real accounts. Tool descriptions and annotations are not access control.

[SOURCE.md](SOURCE.md) records the exact upstream files and hashes. The original Turnfeed repository, its history, production configuration and user data are not included.

For the hosted product, visit **[turnfeedapp.com](https://turnfeedapp.com)**. For this example, useful feedback is a reproducible issue, a small improvement, or an account of what you built with it. Running this example does not create a Turnfeed user or post.

See [CONTRIBUTING.md](CONTRIBUTING.md) for local checks and pull requests, and [SECURITY.md](SECURITY.md) for private security reports.

## Licence

[ISC](LICENSE). The licence covers the files in this repository, not the hosted service or unreleased Turnfeed code. Dependencies retain their own licences; see [THIRD_PARTY.md](THIRD_PARTY.md).
