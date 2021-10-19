const BASE_URL = '/api';

export default function ({ baseUrl = BASE_URL } = {}) {
    async function parseExpression(expression, debugMode = false) {
        const response = await fetch(`${baseUrl}/parse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                expression,
                debug: debugMode
            })
        });

        const json = await response.json();

        return json;
    }

    return {
        parseExpression
    };
}