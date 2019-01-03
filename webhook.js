const secret = process.env.SECRET;

const http = require('http');
const crypto = require('crypto');
const exec = require('child_process').exec;

http.createServer(function (req, res) {
    req.on('data', function(json) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(json.toString()).digest('hex');

        if (!req.headers['x-hub-signature'] == sig) {
            return false;
        }

        console.log(json.toString())
        let branch = '';
        exec(`/srv/pull_from_git.sh ${branch}`);
    });

    res.end();
}).listen(process.env.PORT);
