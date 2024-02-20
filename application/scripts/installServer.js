const {execSync} = require("child_process");
const path = require("path");

const DESTINATION = path.join(__dirname, "../backend");

const installServer = () => {
    execSync(`cd ${DESTINATION} && npm install`);
}
installServer();