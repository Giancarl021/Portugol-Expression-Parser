const Portugol = require('../services/portugol');
const generateFilename = require('../util/filename-generator');

module.exports = async function (request, response) {
    const portugol = Portugol();

    const { expression, debug } = request.body;

    if (!expression || /\n/.test(expression)) {
        return response
            .status(400)
            .json({
                error: 'Invalid expression'
            });
    }

    const result = await portugol.run(expression, generateFilename('expression', 'por'));

    if (debug !== true) {
        delete result.program;
    }

    return response.json(result);
}