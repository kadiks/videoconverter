const { toGif } = require('../src');
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
    let gif = await toGif({
        inputPath: argv.i
    });
    console.log('gif.error', gif.error);
})();