const {execSync} = require("child_process");
const path = require("path");

const DESTINATION = path.join(__dirname, "../frontend");

const installFrontend = () => {
    execSync(`cd ${DESTINATION} && npm install`);
}
installFrontend();