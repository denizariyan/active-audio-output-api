let express = require('express');
let app = express();
let exec = require("child_process").exec;
let path = require('path');

const relPath = path.join(__dirname, 'external', 'EndPointController.exe');

app.post('/out', function (req, res) {
    exec(relPath + " 6");
    res.sendStatus(200)
});

app.post('/in', function (req, res) {
    exec(relPath + " 3");
    res.sendStatus(200)
});

const PORT = 8081;
let server = app.listen(PORT)
console.log(`Server running on ${PORT}`);