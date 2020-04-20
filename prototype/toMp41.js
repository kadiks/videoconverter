const { toMp4 } = require('../src');
const argv = require('minimist')(process.argv.slice(2));

(async () => {
    if (typeof argv.i === 'undefined') {
        console.log('Input parameter [-i] has not been defined');
        return;
    }
    if (argv.i.length === 0) {
        console.log('Input parameter [-i] has not been defined');
        return;
    }
    let startAt = null;
    if (argv.hasOwnProperty('start-at') === true) {
        startAt = argv['start-at'];
    }
    let stopAt = null;
    if (argv.hasOwnProperty('stop-at') === true) {
        stopAt = argv['stop-at'];
    }
    let mp4 = await toMp4({
        inputPath: argv.i,
        startAt,
        stopAt
    });
    console.log('mp4.error', mp4.error);
})();