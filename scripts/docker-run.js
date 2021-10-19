require('dotenv/config');
const { spawn } = require('child_process');

const imageName = process.env.DEV_DOCKER_IMAGE_NAME;
const port = process.env.PORT || 80;

if (!imageName) {
    throw new Error('Invalid docker image name');
}

async function main() {
    console.log('[DOCKER RUNNER] Starting container');

    const dockerProcess = spawn('docker', [
        'run',
        '-d',
        '--rm',
        '-p',
        `${port}:${port}`,
        '-e',
        `PORT=${port}`,
        imageName
    ],
    {
        stdio: 'inherit'
    });

    await new Promise((resolve, reject) => {
        dockerProcess.on('exit', resolve);
        dockerProcess.on('error', reject);
    });
}

main().catch(console.error);
