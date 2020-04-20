const cliProgress = require('cli-progress');

const bar1 = new cliProgress.SingleBar(
    {
        format: '{bar} {percentage}% | ETA: {eta}s | Time: {duration_formatted}'
    },
    cliProgress.Presets.shades_classic
);

module.exports = bar1;