const {
  toMp4,
  toGif,
  pathResolver,
  argsToOpts,
  uploadSlack,
} = require('./src');
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

  const opts = argsToOpts({
    args: argv,
  });

  let mp4 = await toMp4({
    inputPath: argv.i,
    startAt: opts.mp4StartAt,
    stopAt: opts.mp4StopAt,
  });
  if (mp4.error !== null) {
    console.log(mp4.error);
    return;
  }
  let gif = await toGif({
    inputPath: pathResolver.toMp4(argv.i),
    width: opts.gifWidth,
    height: opts.gifHeight,
    isWidthRatio: opts.gifIsWidthRatio,
  });
  if (gif.error !== null) {
    console.log(gif.error);
    return;
  }
  console.log('Files have been converted successfully');

  if (opts.isSlackUpload === true) {
    console.log('Starting Slack upload...');
    console.log('This may take a while');
    let slack = await uploadSlack({
      filePath: pathResolver.toMp4(argv.i),
    });
  }
})();
