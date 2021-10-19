const { spawn } = require('child_process');
const locate = require('@giancarl021/locate');
const fs = require('fs/promises');

const CMD = process.env.PORTUGOL_CONSOLE_CMD || 'portugol-console';


module.exports = function ({ tempPath = 'data/temp' } = {}) {
    const _tempPath = locate(tempPath);

    function convertToProgram(expression) {
        const start = `programa
{
    inclua biblioteca Tipos --> t
    inclua biblioteca Matematica --> m
    funcao inicio()
    {
        escreva(`;

        const end = `)
    }
}`;

        return start + parse(expression) + end;

        function parse(expression) {
            return expression
                .replace(/(seno|cosseno|arredondar|potencia|raiz|valor_absoluto|maior_numero|menor_numero)\(/g, 'm.$&')
                .replace(/(inteiro_para_real|real_para_inteiro)\(/g, 't.$&');
        }
    }

    async function run(expression, filename) {
        if (!expression) {
            throw new Error('Expression could not be empty');
        }
        const program = convertToProgram(expression);

        const path = locate(`${_tempPath}\\${filename}`);

        await fs.writeFile(path, program);

        const cp = spawn(CMD, [path]);

        let result = '';

        await new Promise((resolve, reject) => {
            cp.stdout.on('data', chunk => {
                if (chunk.length === 1) return;
                result += chunk;
            });

            cp.on('exit', resolve);
            cp.on('error', reject);

            cp.stdin.write('\n');
        });


        await fs.unlink(path);

        return result.replace(/(\r?\n)Programa\sfinalizado((\r?\n)*.*)*/m, '');
    }

    return {
        run
    };
}