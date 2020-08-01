var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const fetch = require('node-fetch');
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use(express.static("dist"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const dotenv = require("dotenv").config();
let inputURL = [];
const apiKey = process.env.API_KEY;
const baseURL = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&url=`


app.get("/", function (req, res) {
    res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
const port = 3030;
const server = app.listen(port, () => {
    console.log(`running on localhost: ${port}`);
});


app.post('/apiData', async (req, res) => {
    //newEntry = req.body;
    inputURL = req.body.url;  // retrieves the supplied URL from formHandler
    console.log('inputURL now set as: ', inputURL); //log to help TS the data flow
    const apiRES = await fetch(baseURL+inputURL)
    .then( (apiRES) => apiRES.json())
    .then( data => {
        console.log(data.subjectivity) //log to help TS the data flow
        res.send(data) //sends api data back to the formHandler function
    }).catch((error) => 
    console.log('error', error))
});
module.exports = app;
