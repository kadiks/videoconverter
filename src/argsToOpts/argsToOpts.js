const defaultOpts = require('./defaultOpts');
const argsToOptsKey = require('./argsToOptsKey');

const argsToOpts = ({
    args
}) => {
    const argsArr = Object.keys(args);
    const filteredArgsArr = argsArr.filter(
        arg => arg !== '_' && arg !== 'i'
    );
    // console.log('filteredArgsArr', filteredArgsArr);
    const optsKeys = filteredArgsArr.map(argsToOptsKey);
    // console.log('optsKeys', optsKeys);

    const newOpts = {};

    filteredArgsArr.forEach((oldArg, index) => {
        const newArg = optsKeys[index];
        let val = args[oldArg];
        if (
            val === 'true' || val === 'false'
        ) {
            val = JSON.parse(val);
        }
        newOpts[newArg] = val;
    });
    // console.log('args', args);
    // console.log('newOpts', newOpts);

    const finalOpts = Object.assign(defaultOpts, newOpts);

    // console.log('finalOpts', finalOpts);

    return finalOpts;
};


module.exports = argsToOpts;