const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const bp = require('body-parser')

const app = express();
app.use(cors());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const uri = 'mongodb://rootuser:rootpass@localhost:27017';
const client = new MongoClient(uri);

(async() => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
})()


app.post('/user/login', (req, res) => {
    const { email, password } = req.body;
    client.db("admin").collection("user")
        .findOne({ email, password})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        })
})

app.post('/user/register', (req, res) => {
    const { name, email, password } = req.body;
    client.db("admin").collection("user")
        .insertOne({ name,email, password})
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.send(err);
        });
})


app.listen(3000, () => {
  console.log('[User Server] is running on http://localhost:3000');
});

