const fs = require("fs");
const path = require("path");

const SOURCE = path.resolve(__dirname, "../dist");
const DESTINATION = path.resolve(__dirname, "../build/dist");
if (fs.existsSync(DESTINATION)) {
  fs.rmSync(DESTINATION, { recursive: true, force: true });
}
fs.cpSync(SOURCE, DESTINATION, { recursive: true });

const SOURCE2 = path.resolve(__dirname, "../.env");
const DESTINATION2 = path.resolve(__dirname, "../build/.env");
if (fs.existsSync(DESTINATION2)) {
  fs.rmSync(DESTINATION2, { recursive: false, force: true });
}
fs.cpSync(SOURCE2, DESTINATION2, { recursive: false });
