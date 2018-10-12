const TypeValidators = require('./TypeValidators');

module.exports = {

    /**
     * returns the type checker function name
     * @param {string} type
     * @returns {string}
     */
    getTypeFunction: function (type) {
        return 'is' + type.replace(/^\w/, function (chr) {
            return chr.toUpperCase();
        });
    },

    /**
     * returns the type name of the value
     * @param value
     * @returns {string}
     */
    getTypeName: function (value) {
        let type = '';

        Object.keys(TypeValidators).forEach(typeFunction => {
            if (TypeValidators[typeFunction](value)) {
                type = typeFunction.toLowerCase().substr(2);
            }
        });

        return type;
    }
};