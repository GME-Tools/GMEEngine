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

const i18n = require('i18n');
const cookieParser = require('cookie-parser');

i18n.configure({
  // setup some locales - other locales default to en silently
  locales: ['en', 'fr'],

  // you may alter a site wide default locale
  defaultLocale: 'en',
 
  // sets a custom cookie name to parse locale settings from
  cookie: 'yourcookiename',
 
  // where to store json files - defaults to './locales'
  directory: __dirname + '/locales'
});

// you will need to use cookieParser to expose cookies to req.cookies
app.use(cookieParser());

// i18n init parses req for language headers, cookies, etc.
app.use(i18n.init);

app.listen(3000, function() {
	console.log('listening on 3000');
});