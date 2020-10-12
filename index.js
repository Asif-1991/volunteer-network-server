const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()

const app = express()

app.use(cors());
app.use(bodyParser.json());

const port = 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fvezj.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;



require('dotenv').config()
app.get('/', (req, res) => {
  res.send('Hello from volunteer World!')
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("volunteerNetwork").collection("tasks");
  const volunteerDetail = client.db("volunteerNetwork").collection("volunteerDetail");


  app.post('/addTasks', (req, res) => {
    const task = req.body;
    console.log(task);
    collection.insertOne(task)
      .then(result => {
        res.send(result);
        console.log(result);
      })
  })

  app.get('/allTasks', (req, res) => {
    collection.find({})
      .toArray((err, documents) => {
        res.send(documents)
      })
  })

  app.post('/addVolunteerDetail', (req, res) => {
    const volunteerInfo = req.body;
    volunteerDetail.insertOne(volunteerInfo)
      .then(result => {
        res.send(result);
         console.log(result);
      })
  })

  app.get('/allVolunteerDetail', (req, res) => {
    volunteerDetail.find()
      .toArray((err, documents) => {
        res.send(documents)
      })
  })

  app.delete('/allVolunteerDelete/:id', (req, res) => {
    volunteerDetail.deleteOne({ _id: ObjectId(req.params.id)})
      .then(result => {
        res.send(result);
      })
  })

});

app.listen(process.env.PORT || port)