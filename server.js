var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var isEmpty = require('lodash/isEmpty');
var jade = require("jade");
var validator = require('validator');

function toAlpha(string){
	return string.replace('-','').split(" ").join('');
}

function validate(coordinate){
	var errors = {};

	if(!validator.isAlpha(toAlpha(coordinate.titre))){
    errors.titre = "Pas de caractéres spéciaux !";
    }
    if(!validator.isAlpha(toAlpha(coordinate.text))){
    errors.text = "Pas de caractéres spéciaux !";
	}

	if(validator.isEmpty(coordinate.titre)){
   	   errors.titre = "Champs obligatoires!";
   }


   if(validator.isEmpty(coordinate.text)){
   	   errors.text = "Champs obligatoires!";
   }

   return errors;
}



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('./'));
app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
	res.render('admin', {errors : {}});
});

app.post('/article', function(req, res){
	if(isEmpty(validate(req.body))){
	res.render('index', { user: req.body });
  }else{
    console.log(validate(req.body));
    res.render('admin', {
      titre: req.body.titre,
      text: req.body.text,
      errors: validate(req.body)

  });
		
}

});


app.listen(3000, function() {
    console.log('App listening on port 3000!');
});