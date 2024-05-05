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


// GET ALL EXPENSES
app.get('/expense', (req, res) => {
    client.db("admin").collection("expense-group").find().toArray().then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    });
})

// ADD NEW EXPENSE
app.post('/expense/:id', (req, res) => {
    client.db("admin").collection("expense-group")
        .updateOne({ "_id": new ObjectId(req.params.id) }, {
            $addToSet: { expenses: req.body }
        })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.send(err);
        });
})




app.listen(3001, () => {
  console.log('[Expense Server] is running on http://localhost:3001');
});

