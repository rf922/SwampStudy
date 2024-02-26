const fs = require('fs');
const path = require('path');

const SOURCE =  path.resolve(__dirname, "../build");
const DESTINATION = path.resolve(__dirname, "../../backend/dist");
fs.writeFileSync("console.log", SOURCE);
if(fs.existsSync(DESTINATION)){
    fs.rmSync(DESTINATION, {recursive: true, force: true});
}
fs.cpSync(SOURCE, DESTINATION, {recursive: true});