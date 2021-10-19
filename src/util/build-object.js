module.exports = function (initialData = {}) {
    function build(data = {}) {
        return {
            ...initialData,
            ...data
        };
    }

    return {
        build
    };
}