# Source provenance

This example includes two unmodified files from Turnfeed:

| File | SHA-256 |
| --- | --- |
| `lib/feed-presentation.mjs` | `4157258159656ec66bcfc3bffefea9fa8bb87661162fdd423ada6e15d74c4ec9` |
| `test/feed_digest_helpers.test.js` | `148113aa8b879ed2f2e2e67955466907f8949508062fc5373b469af18ddbdae5` |

The reviewed Turnfeed source tree is `0b5771f38786ce65bf3e2a833cc1d70888e6a2ed`, corresponding to the production repository's main snapshot `7d46e9bb523acc2c6d26e262b3cd97ef81dd1d76` on 21 September 2026. This records provenance, not a claim that a private upstream repository is publicly accessible.

The MCP wrapper, fictional fixture, reader adapter, transport tests and example documentation were written separately for this release. They do not export the rest of the Turnfeed service. The transport uses the official MCP SDK APIs; no SDK source is copied here.

The unchanged formatter module includes helpers for media and quoted posts that the example adapter does not enable. The original formatter tests cover those pure helpers with explicitly registered synthetic media fixtures. They do not contact external URLs.

The new example was prepared with Codex. Source review, tests and licence choice remain the maintainer's responsibility. No production data, deployment files, credentials, private conversations, submission artifacts or original Git history are part of this release.
