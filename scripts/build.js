require('dotenv/config');
const { spawn } = require('child_process');
const { yarnToNpm } = require('synp');
const fs = require('fs/promises');
const locate = require('@giancarl021/locate');

const imageName = process.env.DEV_DOCKER_IMAGE_NAME;

if (!imageName) {
    throw new Error('Invalid docker image name');
}

async function main() {
    console.log('[YARN-TO-NPM] Converting file');

    const mainDir = locate('..');
    const packageLock = yarnToNpm(mainDir);

    console.log('[YARN-TO-NPM] Writing result to package-lock.json');

    await fs.writeFile(locate(`${mainDir}/package-lock.json`), packageLock);

    console.log('[DOCKER BUILDER] Building image');

    const dockerProcess = spawn('docker', [ 'build', '-t', imageName, mainDir ], {
        stdio: 'inherit'
    });

    await new Promise((resolve, reject) => {
        dockerProcess.on('exit', resolve);
        dockerProcess.on('error', reject);
    });

    console.log('[DOCKER BUILDER] Image built successfully');
}

main().catch(console.error);
