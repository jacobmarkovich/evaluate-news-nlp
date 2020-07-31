var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
projectData = {};
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use(express.static("dist"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dotenv = require("dotenv");

app.get("/", function (req, res) {
    res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
const port = 3030;
const server = app.listen(port, () => {
    console.log(`running on localhost: ${port}`);
});

//app.get('/test', function (req, res) {
//     res.send(mockAPIResponse)
// })

app.get("/all", (req, res) => {
    res.send(JSON.stringify(projectData));
});

app.post("/", (req, res) => {
    projectData.summary = req.body.summary;
    res.end();
});

module.exports = app;
