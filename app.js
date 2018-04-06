var express = require('express'),
	app = express(),
	pug = require('pug'),
	nib = require('nib'),
	join = require('path').join,
	publicDir = join(__dirname, 'dist'),
	bowerDir = join(__dirname, 'bower_components');
 

app.use(express.static(publicDir));
app.use(express.static(bowerDir));

app.set('view engine', 'pug');
app.listen(3000, () => {
	console.log('Listening on port 3000');
});


app.get('/', (req, res) => {
	res.render('index');
});

app.get('/home', (req, res) => {
	res.render('home');
});

app.get('/favorites', (req, res) => {
	res.render('favorites');
});