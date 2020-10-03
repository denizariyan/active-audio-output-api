const express = require('express');
const app = express();
const exec = require("child_process").exec;
const path = require('path');

const relPath = path.join(__dirname, 'external', 'EndPointController.exe');

app.post('/out', function (req, res) {
    exec(relPath + " 6"); //6 for outer speakers
    res.sendStatus(200)
});

app.post('/in', function (req, res) {
    exec(relPath + " 3"); //3 for headsets
    res.sendStatus(200)
});

const PORT = 8081;
let server = app.listen(PORT)
console.log(`Server running on ${PORT}`);