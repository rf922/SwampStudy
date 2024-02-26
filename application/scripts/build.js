const {execSync} = require('child_process');
const path = require('path');

const DESTINATION = path.resolve(path.join(__dirname, "../frontend"));

const buildReactApp = () => {
    try{
    const result = execSync(`cd ${DESTINATION} && npm run build2`);
    console.log(result.toString());
    }
    catch (e){
        console.log(e.message)
    }
}
buildReactApp();