require('dotenv/config');
const fs = require('fs');
const locate = require('@giancarl021/locate');

const REQUIRED_ENV = [];

const DIRS = [
    'data/temp'
];

DIRS.map(locate)
    .forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });

REQUIRED_ENV.forEach(variable => {
    if (!process.env[variable]) {
        throw new Error('Missing required environment variable: ' + variable);
    }
});