const { Extendable } = require('klasa');

module.exports = class extends Extendable {

    constructor(...args) {
        super(...args, ['Message'], {
            name: 'range',
            enabled: true,
            klasa: true
        });
    }

    extend(max, min = 0) {
        const returned = []
        for (var i = min; i <= max; i++) {
          returned.push(i)
        }
        return returned
    }

};