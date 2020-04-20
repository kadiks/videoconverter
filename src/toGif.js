const util = require('util');
const path = require('path');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);
const ffmpeg = require('fluent-ffmpeg');

const pathResolver = require('./pathResolver');
const progressBar = require('./progressBar');

const convert = async ({
    inputPath,
    width = 600,
    height = null,
    isWidthRatio = true
} = {}) => new Promise((resolve) => {
    if (pathResolver.isFileExist(inputPath) === false) {
        const errMessage = 'File does not exist at this path';
        console.log(errMessage);
        resolve({
            error: errMessage
        });
        return;
    }
    // const ext = path.extname(inputPath);
    // const outputPath = inputPath.replace(ext, '.gif');
    const outputPath = pathResolver.toGif(inputPath);
    // console.log('inputPath', inputPath);
    // console.log('outputPath', outputPath);
    // const commandArr = [
    //     'ffmpeg',
    //     '-loglevel error',
    //     '-i',
    //     inputPath,
    //     `-vf scale=${width}:-1`,
    //     '-y -f gif',
    //     outputPath
    // ];
    // const command = commandArr.join(' ');
    // const { stderr } = await exec(command);
    let command = ffmpeg(inputPath);
    command = setSize({
        command,
        width,
        height,
        isWidthRatio
    });
    command
        .format('gif')
        .output(outputPath, {
            end: true
        });

    command
        .on('start', () => {
            console.log('Starting conversion to GIF...');
            progressBar.start(100, 0);
        })
        .on('progress', (progress) => {
            progressBar.update(parseInt(progress.percent * 100) / 100);
        })
        .on('error', (err) => {
            resolve({
                error: err
            });
            // command.kill('SIGKILL');
        })
        .on('end', () => {
            progressBar.update(100);
            progressBar.stop();
            resolve({
                error: null
            });
            // command.kill('SIGKILL');
        });

    command.run();
    // console.log('stdout', stdout);
    // console.log('stderr', stderr);
    // console.log('stderr', typeof stderr);
    // console.log('stderr', stderr.length);
    // return {
    //     error: stderr.length === 0 ? null : stderr
    // };
});

const setSize = ({
    command,
    width,
    height,
    isWidthRatio
}) => {
    let str = `${width}x?`;
    if (width === null && height === null) {
        return command;
    }
    if (
        isWidthRatio === false &&
        height !== null
    ) {
        str = `?x${height}`
    }
    return command.size(str);
}

module.exports = convert;