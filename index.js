const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const connectionString =
  "mongodb+srv://" +
  process.env.MDB_USER + ":" + process.env.MDB_PASS +
  "@cluster0.qtcwk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
  })
  .catch(error => console.error(error));

app.listen(3000, function() {
  console.log('listening on 3000');
});
