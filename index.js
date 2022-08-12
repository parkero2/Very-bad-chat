const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs')

const dataFile = require(path.join(__dirname + '/data.json'))

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname+"/index.html"))
})

app.get('/GetData', (_req, res) => {
    res.sendFile(path.join(__dirname, "/data.json"))
})

console.log("E")

app.post('/send', (req, _res) => {
    console.log(req.headers.data)
    dataFile.data.push(req.headers.data)
    if (dataFile["data"].length > 50) {
        dataFile["data"].pop(0)
    }
    fs.writeFile(path.join(__dirname + '/data.json'), JSON.stringify(dataFile, null, 2), function (err) {
        console.log(err)
    });
});

app.get('/wipe', (req, res) => {
    if (req.headers.cod == "Kukki") {
        dataFile["data"] = [];
        fs.writeFile(path.join(__dirname + '/data.json'), JSON.stringify(dataFile, null, 2), function (err) {
            console.log(err)
            if (err) {
                res.sendStatus(500)
            }
        });
        res.sendStatus(200)
        return
    }
    res.sendStatus(401)
})

app.get('/logo', (_req, res) => {
    res.sendFile(path.join(__dirname + '/logo.png'))
})

app.get('/bg', (_req, res) => {
    res.sendFile(path.join(__dirname, "/shrek.png"))
})

app.get('/notification', (_req,res) => {
	res.sendFile(path.join(__dirname, "notif.mp3"))
})

app.listen(9090, () => {
	console.log("E");
})