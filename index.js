const config = require('./config.json')
const express = require('express')
const app = express()
const util = require('minecraft-server-util')
const Rcon = require('modern-rcon')
const bodyParser = require('body-parser')
const ms = require('./libs/minestat')

const QUERY_HOST = config.host
const QUERY_PORT = config.query.port
const RCON_HOST = config.host
const RCON_PORT = config.rcon.port
const RCON_PASS = config.rcon.password

const rcon = new Rcon(RCON_HOST, RCON_PORT, RCON_PASS)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Content-Type', 'application/json')
    next()
})

app.get('/status', async (req, res) => {
    try {
        util.status(QUERY_HOST, {
            port: QUERY_PORT
        }).then(response => {
            res.send({
                resultCode: config.response.successCode,
                resultDescription: config.response.successDescription,
                resultData: response
            })
        }).catch(error => {
            res.send({
                resultDescription: config.response.failed,
                resultData: error
            })
        })
    } catch (error) {
        console.log("error", error)
    }
})

app.post('/send-rcon', (req, res) => {
    try {
        const command = req.body.command
        runCommand(command, (resp) => {
            if (resp.code === 'ECONNREFUSED') {
                res.send({
                    resultCode: config.response.failed,
                    resultData: resp
                })
            } else {
                res.send({
                    resultCode: config.response.successCode,
                    resultDescription: config.response.successDescription,
                    resultData: resp
                })
            }
        })
    } catch (error) {
        console.log("error", error)
    }
})

app.get('/ping', (req, res) => {
    try {
        recievePing(ping => {
            if (ping.latency) {
                res.send({
                    resultCode: config.response.successCode,
                    resultDescription: config.response.successDescription,
                    resultData: ping.latency
                })
            } else {
                res.send({
                    resultCode: config.response.failed
                })
            }
        })
    } catch (error) {
        console.log("error", error)
    }
})

app.listen(config.port, () => {
    console.log(`${config.host}:${config.port} Ready..`)
})


function runCommand(cammand, callback) {
    rcon.connect().then(() => {
        return rcon.send(cammand)
    }).then(res => {
        callback(res)
    }).then(() => {
        return rcon.disconnect()
    }).catch(error => {
        callback(error)
    })
}

function recievePing(callback) {
    ms.init(QUERY_HOST, QUERY_PORT, function (result) {
        callback(ms)
    })
}