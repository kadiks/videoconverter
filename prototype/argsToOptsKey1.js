const atok = require('../src/argsToOpts/argsToOptsKey');

const atokMp4StartAt = atok('mp4-start-at');
console.log(
    'mp4-start-at',
    atokMp4StartAt,
    'mp4StartAt' === atokMp4StartAt
);

const atokGifKeepWidthRatio = atok('gif-keep-width-ratio');
console.log(
    'gif-keep-width-ratio',
    atokGifKeepWidthRatio,
    'gifKeepWidthRatio' === atokGifKeepWidthRatio
);