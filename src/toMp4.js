const util = require('util');
const hbjs = require('handbrake-js');
const exec = util.promisify(require('child_process').exec);

const pathResolver = require('./pathResolver');
const progressBar = require('./progressBar');

const convert = async ({
    inputPath,
    startAt = null,
    stopAt = null
} = {}) => new Promise((resolve, reject) => {
    if (pathResolver.isFileExist(inputPath) === false) {
        const errMessage = 'File does not exist at this path';
        console.log(errMessage);
        resolve({
            error: errMessage
        });
        return;
    }
    // const ext = path.extname(inputPath);
    // let suffix = ext === '.mp4' ? '-1' : '';
    // const outputPath = inputPath.replace(ext, suffix + '.mp4');
    const outputPath = pathResolver.toMp4(inputPath);
    // console.log('inputPath', inputPath);
    // console.log('outputPath', outputPath);
    // const commandArr = [
    //     'HandBrakeCLI',
    //     '-i',
    //     inputPath,
    //     '-o',
    //     outputPath,
    //     '-Z "Fast 1080p30"'
    // ];
    // const command = commandArr.join(' ');
    // const { stderr, stdout } = await exec(command);
    const opts = {
        input: inputPath,
        output: outputPath,
        preset: 'Fast 1080p30'
    };
    if (startAt !== null) {
        opts['start-at'] = `duration:${startAt}`;
    }
    if (stopAt !== null) {
        opts['stop-at'] = `duration:${stopAt}`;
    }
    hbjs.spawn(opts)
        .on('error', (err) => {
            progressBar.stop();
            resolve({
                error: err
            });
        })
        .on('begin', () => {
            console.log('Starting conversion to MP4...');

            progressBar.start(100, 0);
        })
        .on('progress', (progress) => {
            // console.log('Progress', progress.percentComplete);
            // console.log('ETA', progress.eta);
            progressBar.update(progress.percentComplete);

        })
        .on('end', () => {
            progressBar.update(100);
            progressBar.stop();
            resolve({
                error: null
            });
        });
    // console.log('stdout', stdout);
    // console.log('stderr', stderr);
    // console.log('stderr', typeof stderr);
    // console.log('stderr', stderr.length);
    // console.log('RETURN!');
    // return {
    //     error: null
    // };
    // return {
    //     error: stderr.includes('Encode done!') === true ? null : stderr
    // };
});

module.exports = convert;