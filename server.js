var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./'));
app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
	res.render('admin');
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});