const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require('cors');
require('dotenv').config()

const app = express(); 

const user = process.env.USER;
const password = process.env.PASSWORD;
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${user}:${password}@cluster0.vetwi.mongodb.net/${dbName}?retryWrites=true&w=majority`;

app.use(cors());  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db(`${dbName}`).collection(`${collectionName}`);
//   console.log('Database Setup Successful');
  
  app.post('/addProduct', (req, res) => {
	  const products = req.body; 
	//   console.log(product);
	  collection.insertMany(products) 
	  .then(result => {
		  console.log(result);
		  res.send(result.length)
	  })
	  .catch(err => {
		  console.log(err);
	  })
  })

  app.get('/products', (req, res) => {
	  collection.find({}).limit(20)
	  .toArray( (err, documents) => {
		res.send(documents);
	  })
  })

  app.get('/product/:key', (req, res) => {
	  collection.find({key: req.params.key}).limit(20)
	  .toArray( (err, documents) => {
		res.send(documents[0]);
	  })
  })

});



app.listen(5000); 