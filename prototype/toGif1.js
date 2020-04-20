const { toGif } = require('../src');

(async () => {
    let gif = await toGif({
        inputPath: '../../../../../konexio2/videos/express_db_2.mp4'
    });
    console.log('gif.error', gif.error);
})();