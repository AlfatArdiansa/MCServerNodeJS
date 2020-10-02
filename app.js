// Setup Server Configuration
const ServerConf = [
  "-Xmx1024M", // Max Memory usage for server
  "-Xms1024M", // Min Memory usage for server
  "-jar",
  "server.jar", // Rename to your server jar name
  "nogui", // Nogui
];

// Setup Child Process
const spawn = require("child_process").spawn;
// Setup Express
const express = require("express");
const app = express();
app.use(
  require("body-parser").urlencoded({
    extended: false,
  })
);

// Setup child process for server
const MCServerProcess = spawn("java", ServerConf);

// Setup loging
let log = function (data) {
  process.stdout.write(data.toString());
};
MCServerProcess.stdout.on("data", log);
MCServerProcess.stderr.on("data", log);

// Create a route that will respond to GET request
// Example: localhost:port/command?body=kill @a
app.get("/command", (req, res) => {
  // Get Command from HTTP request and send it to the minecraft server
  let command = req.param("body");
  MCServerProcess.stdin.write(command + "\n");

  // Buffer output for a quarter of a second, then reply to HTTP request
  let buffer = [];
  let collector = function (data) {
    data = data.toString();
    buffer.push(data.split("]: ")[1]);
  };
  MCServerProcess.stdout.on("data", collector);
  setTimeout(() => {
    MCServerProcess.stdout.removeListener("data", collector);
    res.send(buffer.join(""));
  }, 300);
});
// Create a route that will respond to GET request
// Example:
// let xhttp = new XMLHttpRequest();
// xhttp.open("POST", "http://localhost:port/command", true);
// xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// xhttp.send("cmd=kill @a");
app.post("/command", (req, res) => {
  // Get Command from HTTP request and send it to the minecraft server
  let command = req.param("cmd");
  console.log(command);
  MCServerProcess.stdin.write(command + "\n");

  // Buffer output for a quarter of a second, then reply to HTTP request
  let buffer = [];
  let collector = function (data) {
    data = data.toString();
    buffer.push(data.split("]: ")[1]);
  };
  MCServerProcess.stdout.on("data", collector);
  setTimeout(() => {
    MCServerProcess.stdout.removeListener("data", collector);
    res.send(buffer.join(""));
  }, 300);
});

app.listen(3000);
