	var express = require('express');
	var app = express();
	var bodyParser = require('body-parser');
	var nodefs = require('fs');
	var isEmpty = require('lodash/isEmpty');
	var jade = require("jade");
	var validator = require('validator');
	var uuidV1 = require('uuid/v1');
	var tableau = [];

    // Champs à respecter(validator)
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


    //Route page admin 
	app.get('/', function (req, res) {
		res.render('admin', {errors : {}});
	});


    //Route post pour afficher les erreurs et les pages + nodefs
	app.post('/article', function ( req, res){

		nodefs.readFile('stockage.json', 'utf8', function(err, data){
			if(err) {
				throw err;

			}
			tableau = JSON.parse(data);
			console.log(content);
		});
		//console.log(req.body);
		var content = req.body;
		content.id = uuidV1();
		tableau.push(content);
		nodefs.writeFile('stockage.json',JSON.stringify(tableau), function(err){
			if(err) {
				throw err;
			}
			console.log("Enregistrement effectué avec succès !");


		});

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
    

    //Afficher titre dans page admin 
	app.get('/afficher', function (req, res){
    res.send(JSON.stringify(tableau));
 	});
    
    //Supprimer un article
 	app.get('/delete', function(req, res){

	var id = (req.query._id); 

	for (var i = 0; i < tableau.length; i++){
		if (tableau[i]._id == id) {
			tableau.splice(i,1);
			continue;
		}
	}
 	});



	app.listen(3000, function() {
		console.log('App listening on port 3000!');
	});
