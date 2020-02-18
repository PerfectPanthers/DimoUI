//Install express server
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const basePath = "https://dimoapi.herokuapp.com";
app.use(express.json())


app.get('/api/*', function (req, res) {
    const fullPath = `${basePath}${req.url}`;
    console.log("full path  ", fullPath);
    axios.get(fullPath)
        .then(response => {
            console.log(response.data);
            res.send(response.data)
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500)
        });
});


app.post('/api/*', function (req, res) {
    const fullPath = `${basePath}${req.url}`;
    console.log("full path  ", fullPath);
    console.log(req.body);
    axios.post(fullPath, req.body, {
        headers: {
            'content-type': 'application/json'
        },
    })
        .then(function (response) {
            console.log(response.data);
            res.send(response.data);
        })
        .catch(function (error) {
            console.log(error);
            res.sendStatus(500);
        });
});



// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/dimoUI'));

app.get('/*', function (req, res) {
    console.log("index file sent")
    res.sendFile(path.join(__dirname + '/dist/dimoUI/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8090, () => console.log("Server started"));