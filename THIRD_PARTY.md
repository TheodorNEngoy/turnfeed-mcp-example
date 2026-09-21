# Dependencies

No dependency source code, assets, fonts or icons are vendored in this repository.

Direct dependencies:

| Package | Version | Declared licence | Upstream |
| --- | --- | --- | --- |
| `@modelcontextprotocol/sdk` | 1.29.0 | MIT | https://github.com/modelcontextprotocol/typescript-sdk |
| `zod` | 4.2.1 | MIT | https://github.com/colinhacks/zod |

`package-lock.json` records the resolved dependency tree and package licence metadata. Installed packages retain their own licence files. Their licences are separate from the ISC licence for this example. Redistribution of a bundle containing dependencies must retain the notices required by those dependencies.

The SDK's `@hono/node-server` dependency is pinned to 2.0.11 through an override, matching the reviewed Turnfeed dependency baseline. Pinning is not a claim that future advisories cannot occur.

The fictional records and adapter documentation were written for this example. `SOURCE.md` identifies the two files copied from Turnfeed unchanged.
