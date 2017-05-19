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

    // app.get('/ ', function(req, res){
    // 	res.render('connexion');
    // });
 

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
				id : req.body.id,
				input : req.body.inputModif,
				textarea : req.body.textareaModif,
				errors: validate(req.body)

			});
		}

	});
    

    //Afficher titre dans page admin 
    app.get('/afficher', function (req, res){
    	res.send(JSON.stringify(tableau));
    });
    
    //Supprimer un article

    app.post('/delete', function(req, res) {
    	var id = (req.body.id);

    	for (var i = 0; i < tableau.length; i++) {
    		if(tableau[i].id == id){
    			tableau.splice(i,1);
    			continue;
    		}
    	}
    	nodefs.writeFileSync('stockage.json', JSON.stringify(tableau), 'UTF-8');
    	res.send('stockage.json supprimé...');
    });

    app.post('/update', function(req, res){

    	var modifier = (req.body.id); 

    	for (var i = 0; i < tableau.length; i++){
    		if (tableau[i].id == modifier) {
    			tableau[i] = JSON.parse(req.body.value);
    			continue;
    		}
    	}
    	nodefs.writeFileSync('stockage.json', JSON.stringify(tableau), 'UTF-8');
    	res.send('stockage.json modifié...');
    });

    app.post("/Login", function (req, res) {
    	var Obj = { "Username": req.body.username, "Password": req.body.password, "error": null };
    	if (!req.body.Username && !req.body.password) {
    		Obj.error = "User name is required";
    		res.redirect("admin", Obj);
    	} else if (req.body.username == req.session.username) {
    // User has not changed Username, accept it as-is
    res.redirect("/");
} else if (!req.body.username.match(/^[a-zA-Z0-9\-_]{3,}$/)) {
	Obj.error = "User name must have at least 3 alphanumeric characters";
	res.render("admin", Obj);
} else {
    // Validate if Username is free
    if (UsernameIsAlreadyUsed) {
    	Obj.error = "User name is already used by someone else";
    	res.render("index", Obj);
    } else {
    	req.session.username = req.body.username;
    	res.render("admin");
    }
}
});



    app.listen(3000, function() {
    	console.log('App listening on port 3000!');
    });
