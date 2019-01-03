const secret = process.env.SECRET;

const http = require('http');
const crypto = require('crypto');
const exec = require('child_process').exec;

http.createServer(function (req, res) {
    req.on('data', function(chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

        if (req.headers['x-hub-signature'] == sig) {
            // 1. Get the repository name, branch name
            let repo = '';
            let branch = '';
            // 2. Compose path
            let repo_path = '/srv/' + repo + '-dev/' + repo + '/';
            exec('cd ' + repo_path + ' && git reset --hard && git pull');
        }
    });

    res.end();
}).listen(process.env.PORT);