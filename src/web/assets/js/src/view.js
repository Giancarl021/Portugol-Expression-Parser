export default function () {
    const $parseBtn = document.querySelector('#btn-parse');
    const $expressionInput = document.querySelector('#ipt-expression');
    const $debugCheckbox = document.querySelector('#chb-debug');
    const $programOutput = document.querySelector('#otp-program');

    function loadResult(result) {

    }

    function loadDebugProgram(program) {
        $programOutput.innerText = program;

        console.log(window.HighlightJS);

        window.HighlightJS.highlightBlock($programOutput);
    }

    function unloadResult() {
        
    }

    function unloadDebugProgram() {

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
                loadDebugProgram(result.program);
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