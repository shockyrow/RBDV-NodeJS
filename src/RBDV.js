const Helpers = require('./Helpers');
const TypeValidators = require('./TypeValidators');
const ExampleRule = require('./ExampleRule');

module.exports = (function () {
    /**
     * returns an instance of RBDV
     * @param {Object} rules
     * @param {boolean} is_verbose
     * @constructor
     */
    function RBDV(rules = null, is_verbose = false) {
        /**
         * rules getter
         * @returns {Object}
         */
        this.getAllRules = function () {
            return rules;
        };

        /**
         * chained rules setter
         * @param {Object} new_rules
         * @returns {RBDV}
         */
        this.setRules = function (new_rules) {
            rules = new_rules;
            return this;
        };

        /**
         * returns rules[ruleName] or null
         * @param {string} ruleName
         * @returns {*}
         */
        this.getRule = function (ruleName) {
            return (rules ? (rules[ruleName] || null) : null);
        };

        /**
         * verbose getter
         * @returns {boolean}
         */
        this.isVerbose = function () {
            return verbose;
        };

        /**
         * chained rules verbose
         * @param {boolean} new_verbose
         * @returns {RBDV}
         */
        this.setVerbose = function (new_verbose) {
            verbose = new_verbose;
            return this;
        };
    }

    /**
     * returns true if data is valid
     * @param {*} data
     * @param {string} ruleName
     */
    RBDV.prototype.isValid = function (data, ruleName) {
        if (this.getAllRules() == null) {
            if (this.isVerbose()) {
                console.log(
                    'No configuration assigned!' +
                    '\nPlease assign your configuration and try again!' +
                    '\nExample: jsonDataValidator.config = myconfig;'
                );
            }
            return false;
        } else {
            return !!this.validate(data, this.getRule(ruleName));
        }
    };

    /**
     * returns true if data is valid
     * @param {*} data
     * @param {Object} rule
     * @param {string} name
     * @returns {boolean}
     */
    RBDV.prototype.validate = function (data, rule, name = 'data') {
        try {
            let isValid = TypeValidators[Helpers.getTypeFunction(rule.type)](data);

            if (!isValid) {
                if (this.isVerbose()) {
                    console.log(
                        '-----------Validator Error-----------' +
                        '\nObject Path: ' + name +
                        '\nExpected: ' + rule.type +
                        '\nGot: ' + Helpers.getTypeName(data) +
                        '\nValue: ' + data +
                        '\n-------------------------------------'
                    );
                }
                return false;
            } else if (rule.props) {
                Object.keys(rule.props).forEach(
                    value => {
                        isValid &= this.validate(data[value], rule.props[value], name + '.' + value);
                    }
                );
            }

            return !!isValid;
        } catch (e) {
            return false;
        }
    };

    RBDV.prototype.exampleRule = function () {
        return ExampleRule;
    };

    RBDV.prototype.makeRule = function (data) {
        let rule = {
            type: Helpers.getTypeName(data)
        };

        if (rule.type === 'object') {
            rule.props = {};

            Object.keys(data).forEach(prop => {
                rule.props[prop] = this.makeRule(data[prop]);
            });
        }

        return rule;
    };

    return RBDV;
}());