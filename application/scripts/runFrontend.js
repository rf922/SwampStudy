const {execSync} = require('child_process');
const path = require('path');

const DESTINATION = path.join(__dirname, "../frontend");

const runFrontend = () => {
    execSync(`cd ${DESTINATION} && npm start`)
}

runFrontend();