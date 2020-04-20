// node prototype/cliFanger1 --i ../okok.mov --mp4-start-at 12 --mp4-stop-at 43 --gif-width 800 --gif-is-width-ratio false

const { argsToOpts } = require('../src')
const argv = require('minimist')(process.argv.slice(2));

const opts = argsToOpts({
    args: argv
});

console.log('opts', opts);