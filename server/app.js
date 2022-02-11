const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./db/mongoose');
const admin = require('./models/admin')
const voter = require('./models/voter')


const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.post('/login', async (req, res) => {
    console.log(req.body);
    const result = await admin.findOne({ "username": req.body.username, "password": req.body.password })
    if (result) {
        res.send(true)
    }
    else {
        res.send(false)
    }
})

app.post('/voterLogin', async (req, res) => {
    const result = await voter.findOne({ "voter_name": req.body.name, "voter_id": req.body.id })

    if (result) {
        if (result.voted === true) {
            res.send(result)
        }
        else {
            res.send(result)
        }
    }
    else {
        res.send(false)
    }
})

app.get('/getVoters', async (req, res) => {
    const result = await voter.find({})
    if (result) {
        res.send(result)
    }
    else {
        res.send([])
    }
})

app.get('/voterVoted', async (req, res) => {
    const result = await voter.find({ voted: true })
    if (result) {
        res.send(result)
    }
    else {
        res.send([])
    }
})

app.post('/addVoter', async (req, res) => {
    const result = voter.create({ voter_name: req.body.name, voter_id: req.body.id, voted: req.body.voted, signature: req.body.signature, key_generated: false })
    if (result) {
        res.send(true)
    }
    else {
        res.send(false)
    }
})

app.post('/voted', async (req, res) => {
    const result = await voter.updateOne({ voter_name: req.body.voter_name, voter_id: req.body.voter_id }, { $set: { voted: true } })
    if (result) {
        res.send(true)
    }
    else {
        res.send(false)
    }
})

app.post('/setKeyGenerated', async (req, res) => {
    const result = await voter.updateOne({ voter_name: req.body.name, voter_id: req.body.id }, { $set: { key_generated: true } })
    if (result) {
        res.send(true)
    }
    else {
        res.send(false)
    }
})

app.post('/setSignature', async (req, res) => {
    const result = await voter.updateOne({ voter_name: req.body.name, voter_id: req.body.id }, { $set: { signature: req.body.signature } })
    if (result) {
        res.send(true)
    }
    else {
        res.send(false)
    }
})

app.post('/getSignature', async (req, res) => {
    const result = await voter.findOne({ voter_name: req.body.name, voter_id: req.body.id })
    if (result) {
        res.send(result)
    }
    else {
        res.send(false)
    }
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("Server is up on port " + port)
});