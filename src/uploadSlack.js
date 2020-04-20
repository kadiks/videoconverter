require('dotenv').config();

const path = require('path');
const fs = require('fs-extra');
const request = require('request-promise-native');

const pathResolver = require('./pathResolver');

const upload = async ({
    filePath,
    channel = process.env.SLACK_CHANNEL
} = {}) => {
    if (pathResolver.isFileExist(filePath) === false) {
        return {
            error: `File does not exist at this path: ${filePath}`
        };
    }

    if (
        channel === null ||
        typeof channel === 'undefined'
    ) {
        return {
            error: 'Channel parameter has not been set'
        };
    }

    const file = fs.createReadStream(filePath);
    const filename = path.basename(filePath);
    const channels = channel;

    const opts = {
        url: 'https://slack.com/api/files.upload',
        method: 'POST',
        formData: {
            token: process.env.SLACK_BOT_TOKEN,
            title: filename,
            filename,
            filetype: "auto",
            channels,
            file
        }
    };

    try {
        const res = await request(opts);
        console.log(res);
    } catch (e) {
        return {
            error: e
        }
    }
};

module.exports = upload;


// require('dotenv').config();

// const fs = require('fs-extra');
// const request = require('request');


// request.post({
//     url: 'https://slack.com/api/files.upload',
//     formData: {
//         token: process.env.SLACK_BOT_TOKEN,
//         title: "Snippet",
//         name: 'Snippet',
//         filename: "surprise.js",
//         filetype: "auto",
//         channels: '#random',
//         file: fs.createReadStream('fixtures/js/helloWorld.js'),
//     },
// }, function (err, response) {
//     console.log(err);
//     console.log(JSON.parse(response.body));
// });