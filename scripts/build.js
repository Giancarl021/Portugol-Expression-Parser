require('dotenv/config');
const { spawn } = require('child_process');
const locate = require('@giancarl021/locate');

const imageName = process.env.DEV_DOCKER_IMAGE_NAME;

if (!imageName) {
    throw new Error('Invalid docker image name');
}

async function main() {
    const mainDir = locate('..');

    console.log('[DOCKER BUILDER] Building image');

    const dockerProcess = spawn('docker', [ 'build', '-t', imageName, mainDir ], {
        stdio: 'inherit'
    });

    await new Promise((resolve, reject) => {
        dockerProcess.on('exit', resolve);
        dockerProcess.on('error', reject);
    });
}

main().catch(console.error);
