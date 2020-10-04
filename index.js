const express = require("express");
const app = express();
const exec = require("child_process").exec;
const path = require("path");
const relPath = path.join(__dirname, "external", "EndPointController.exe");

/**
 * Have to use a var like this because ESP8266 is just blasting the state of
 * the button and if I try to set the output all the time I cant listen to anything
 * since it cuts the the audio for a split second every time the audio output is set
 *
 * @var {string} lastReq
 */
let lastReq = "";

app.post("/out", function (req, res) {
  if (lastReq !== "out") {
    exec(relPath + " 6"); //6 for outer speakers
  }
  res.sendStatus(200);
  lastReq = "out";
});

app.post("/in", function (req, res) {
  if (lastReq !== "in") {
    exec(relPath + " 3"); //3 for headsets
  }
  res.sendStatus(200);
  lastReq = "in";
});

const PORT = 8081;
let server = app.listen(PORT);
console.log(`Server running on ${PORT}`);
