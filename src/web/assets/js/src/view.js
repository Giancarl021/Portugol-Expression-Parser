export default function () {
    const $programContainer = document.querySelector('#program-container');
    const $resultContainer = document.querySelector('#result-container');
    const $errorContainer = document.querySelector('#error-container');
    const $warningContainer = document.querySelector('#warning-container');

    const $parseBtn = document.querySelector('#btn-parse');
    const $expressionInput = document.querySelector('#ipt-expression');
    const $debugCheckbox = document.querySelector('#chb-debug');
    const $programOutput = $programContainer.querySelector('#otp-program');
    const $resultOutput = $resultContainer.querySelector('#otp-result');
    const $errorOutput = $errorContainer.querySelector('#otp-error');
    const $warningOutput = $warningContainer.querySelector('#otp-warning');

    function loadResult(result) {
        const warns = (result.warning || []).reduce((acc, warn) => acc + `<li>${warn}</li>`, '');

        if (warns) {
            $warningOutput.innerHTML = warns;
            $warningContainer.style.display = 'block';
        }

        if (result.status === 'error') {
            $errorOutput.innerHTML = result.value.reduce((acc, err) => acc + `<li>${err}</li>`, '');
            $errorContainer.style.display = 'block';
            return;
        }

        $resultOutput.innerText = result.value;

        $resultContainer.style.display = 'block';
    }

    function loadDebugProgram(program) {
        $programOutput.innerText = program;

        window.HighlightJS.highlightBlock($programOutput);

        $programContainer.style.display = 'block';
    }

    function unloadResult() {
        $resultContainer.style.display = 'none';
        $errorContainer.style.display = 'none';
        $resultContainer.style.display = 'none';
        $warningContainer.style.display = 'none';
    }

    function unloadDebugProgram() {
        $programContainer.style.display = 'none';
    }

    function bindEvents({ api }) {
        $parseBtn.onclick = async event => {
            event.preventDefault();

            unloadResult();
            unloadDebugProgram();

            const { value: expression } = $expressionInput;
            const { checked: debugMode } = $debugCheckbox;

            if (!expression) {
                $expressionInput.classList.add('is-danger');
                return;
            }

            $expressionInput.classList.remove('is-danger');

            const result = await api.parseExpression(expression, debugMode);

            loadResult(result);

            if (debugMode) {
                loadDebugProgram(result.program, debugMode);
            }
        }
    }

    return {
        bindEvents,
        loadResult,
        loadDebugProgram,
        unloadResult,
        unloadDebugProgram
    };
}