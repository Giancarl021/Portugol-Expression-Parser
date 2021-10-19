const uuid = require('uuid');

module.exports = function (prefix = '', extension = '') {
    return `${prefix}-${Date.now()}-${uuid.v4()}.${extension}`;
}