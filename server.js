const express = require("express");
const path = require('path');
const app = express();
const { exec } = require("child_process");

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.post("/command", (request, response) => {
    const { command } = request.body

    // Executing command
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

    response.send(JSON.stringify({ "success": true }));
});

app.listen(3000, () => {
    console.log("Listen on the port 3000...");
});