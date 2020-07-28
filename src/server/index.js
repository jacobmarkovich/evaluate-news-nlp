var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
projectData = {}
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
app.use(express.static('dist'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const dotenv = require('dotenv')
dotenv.config()
const key = process.env.API_ID

//console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
const port = 3030
const server = app.listen(port, () => {
    console.log(`running on localhost: ${port}`)
})

//app.get('/test', function (req, res) {
//     res.send(mockAPIResponse)
// })

app.get('/all', (req, res) => {
    res.send(JSON.stringify(projectData))
})

app.post('/', (req, res) => {
    projectData.summary = req.body.summary
    res.end();
})
// app.post('/sentiment-analysis', (req, res) => {
//     textapi.sentiment({ url: req.body.url }, (error, result) => {
//         if (error) {
//             console.log('Error during Aylien request')
//             res.send();
//             return;
//         }
//         console.log('Got Aylien result')
//         res.send(result)
//     })
// })

module.exports = app
