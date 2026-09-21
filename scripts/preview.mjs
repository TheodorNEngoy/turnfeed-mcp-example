import { readDemoFeed, readDemoThread } from "../lib/demo-reader.mjs";

console.log(readDemoFeed().displayText);
console.log("\n--- Open the dinner thread ---\n");
console.log(readDemoThread("demo-dinner").displayText);
