const {execSync} = require('child_process');
const path = require('path');

const DESTINATION = path.resolve(path.join(__dirname, "../backend"));

const runServer = () => {
    execSync(`cd ${DESTINATION} && npm start`)
}

runServer();