const {execSync} = require('child_process');
const path = require('path');

const DESTINATION = path.resolve(path.join(__dirname, "../frontend"));

const buildReactApp = () => {
    execSync(`cd ${DESTINATION} && npm run build`);
}
buildReactApp();