# Contributing

Small fixes, clearer examples and reproducible bug reports are welcome. This repository is a read-only MCP example with fictional data. Keep changes focused on that purpose.

## Run the checks

Use Node.js 22, then run:

```sh
npm ci
npm test
npm run demo
```

The tests cover the formatter, fictional feed and thread context, HTTP MCP and stdio. They use local processes and loopback HTTP; no account, API key, database, tunnel or paid service is needed. CI runs these same checks on pull requests and pushes to `main`. A local or CI pass does not verify behavior in ChatGPT or another native host.

For manual HTTP use, run `npm start` and stop it with Ctrl+C when finished. See the [README](README.md) for connection instructions.

## Report a bug

Open an [issue](https://github.com/TheodorNEngoy/turnfeed-mcp-example/issues) with:

- The commit you tested, your Node.js version and operating system.
- The command or tool call, expected result and actual result.
- A minimal reproduction using fictional data, plus relevant error output.

Remove credentials and personal information from logs. Report sensitive security findings privately using [SECURITY.md](SECURITY.md).

## Propose a change

1. Describe the problem and keep the patch small. Discuss changes to the example's scope in an issue first.
2. Add or update a focused test when behavior changes. Documentation-only edits do not need new tests.
3. Run the relevant checks and include the commands and results in your pull request. State separately any host behavior you actually verified.
4. Preserve fictional fixtures and the loopback Host/Origin protections. Do not add production credentials or live Turnfeed data.

[SOURCE.md](SOURCE.md) identifies the imported formatter and its tests. If a change modifies either imported file, document the divergence there so the provenance remains accurate. Keep license notices and dependency attribution intact.
