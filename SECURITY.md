# Reporting a security issue

Send sensitive security findings privately to **support@turnfeedapp.com**, with the subject **Turnfeed security report**. This is the contact listed on [Turnfeed's security page](https://turnfeedapp.com/security).

Identify this repository (`turnfeed-mcp-example`) and include:

- The affected commit, file or route, and your Node.js version.
- Minimal reproduction steps using fictional data and local endpoints.
- The observed result, expected result and demonstrated impact.
- Relevant logs or a small proof of concept, with credentials and personal information removed.

Keep sensitive exploit details out of public issues and pull requests. This example contains no production account system or real user data; testing it does not authorize testing the hosted Turnfeed service or other systems.

The HTTP example listens on loopback and checks Host and Origin headers. Preserve those protections when experimenting. Public hosting, private data or write operations require their own security design and validation.
