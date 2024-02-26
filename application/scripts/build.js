const {execSync} = require('child_process');
const path = require('path');

const DESTINATION = path.resolve(path.join(__dirname, "../frontend"));

const buildReactApp = () => {
    const result = execSync(`cd ${DESTINATION} && npm run build`);
    console.log(result.toString());
}
buildReactApp();