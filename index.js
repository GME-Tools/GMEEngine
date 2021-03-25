const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', require('./router/index'));

const connectionString =
	'mongodb+srv://' +
	process.env.MDB_USER +
	':' +
	process.env.MDB_PASS +
	'@cluster0.qtcwk.mongodb.net/gmeengine?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
		useUnifiedTopology: true,
		useNewUrlParser: true
	}
)
	.then(() => {
		console.log('Connected to Database');
	})
	.catch(error => console.error(error));

app.listen(3000, function() {
	console.log('listening on 3000');
});
