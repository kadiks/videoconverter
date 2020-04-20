const fs = require('fs');
const path = require('path');

const isFileExist = (filePath) => {
    return fs.existsSync(filePath);
};

const toGif = (filePath) => {
    const ext = path.extname(filePath);
    const outputPath = filePath.replace(ext, '.gif');
    return outputPath;
};

const toMp4 = (filePath) => {
    const ext = path.extname(filePath);
    let suffix = ext === '.mp4' ? '-1' : '';
    const outputPath = filePath.replace(ext, suffix + '.mp4');
    return outputPath;
};

module.exports = {
    isFileExist,
    toMp4,
    toGif
};