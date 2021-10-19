import Api from './src/api.js';
import View from './src/view.js';

async function main() {
    const api = Api();
    const view = View();

    view.bindEvents({ api });
}

document.addEventListener('DOMContentLoaded', main);