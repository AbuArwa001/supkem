const fs = require('fs');

async function test() {
  console.log("Current file content:", fs.readFileSync("src/data/social-settings.json", "utf-8"));
}

test();
