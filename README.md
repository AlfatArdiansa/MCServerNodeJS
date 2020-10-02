# MCServerNodeJS
this is my first open source project i hope you guys like it. I use child_process to connect nodejs with a minecraft server using java

## Installation

Clone this repository and Use node package manager/[npm](https://www.npmjs.com/get-npm) to install dependency.

```bash
npm install
```

Then download the minecraft server according to the version you want at [MCVersion](https://mcversions.net/) and put the server jar to the same directory you used for MCServerNodeJS

Set your own configuration in app.js
```
// Setup Server Configuration
const ServerConf = [
  "-Xmx1024M", // Max Memory usage for server
  "-Xms1024M", // Min Memory usage for server
  "-jar",
  "server.jar", // Rename to your server jar name
  "nogui", // Nogui
];
```
run the server
```bash
node app.js
```
accept eula by changing eula to true in the eula.txt file
```bash
eula=false
// to
eula=true
```
config your own server properties in the server.properties file

the minecraft server should be running now
```bash
node app.js
```

In a browser open up: http://localhost:3000/command?body=help

## License
[MIT](https://choosealicense.com/licenses/mit/)
