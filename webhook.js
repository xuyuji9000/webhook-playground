const secret = process.env.SECRET;

const http = require('http');
const crypto = require('crypto');
const exec = require('child_process').exec;

http.createServer(function (req, res) {
    req.on('data', function(chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
        console.log(chunk.toString())
        console.log(req.headers['x-hub-signature'])
        console.log(sig)

        if (req.headers['x-hub-signature'] == sig) {
            console.log(chunk.toString())
            // 1. Get the repository name, branch name
            let repo = '';
            let branch = '';
            // 2. Compose path
            let repo_path = '/srv/' + repo + '-' + branch + '/' + repo + '/';
            exec('cd ' + repo_path + ' && git reset --hard && git pull');
        }
    });
    res.end();
}).listen(process.env.PORT);
