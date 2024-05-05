const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
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


// GET ALL EXPENSES GROUPS
app.get('/expense/group/user/:id', (req, res) => {
    client.db("admin").collection("expense-group").find({ "user": req.params.id }).toArray().then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    });
})

// GET AN EXPENSE GROUP
app.get('/expense/group/:id', (req, res) => {
    client.db("admin").collection("expense-group")
        .findOne({ "_id": new ObjectId(req.params.id) })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.send(err);
        });
})

// ADD NEW EXPENSE GROUP
app.post('/expense/group', (req, res) => {
    const { name,date,user } = req.body;
    client.db("admin").collection("expense-group").insertOne(req.body)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.send(err);
        });
})




app.listen(3002, () => {
  console.log('[Expense Group Server] is running on http://localhost:3002');
});

