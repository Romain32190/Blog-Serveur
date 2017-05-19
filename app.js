var textarea = $("textarea").val("");
var input = $("input").val("");

function afficher(article){

	$.ajax({ 
		url:'/afficher', 
		data: { 
			task: 'get', 
		}
		
	}).done(function(data){

		data=JSON.parse(data);
		console.log(data);

		for (var i = 0; i < data.length; i++) {
			$("#title").append('<div><option value="'+i+'">'+data[i].titre+'</option></div>');
			$("#article").append('<div class="ID'+i+'">'+data[i].text+'</div>');
			$('#title').html();
			$('#contenu').append('<li role="presentation"><a id="contenu" value="'+i+'" href="#">'+data[i].titre+'</a></li> <button  data-id="'+data[i].id+'" class="waves-effect waves-light btn-small red supprimer">Supprimer</button><button value="'+data[i].id+'" class="waves-effect waves-light btn-small blue modifier">Modifier</button></li>');


		}

		$("body").delegate('.supprimer', 'click', function(e) {
			e.preventDefault();
			console.log('Yaaay');
			var id = $(this).data('id');
			console.log(id);
			$.ajax({  
				url:'/delete',
				method: 'POST',
				data: {
					id: id,
				}
			}).done(function(e){
				console.log(e);
			});

		});
	});
}


$('#contenu').click(function(){
var ind = $(this).attr('value');
console.log(ind);
$("#inputModif").val($("#text"));
$("#textareaModif").val($("#titre"));
});


$("body").delegate('.modifier', 'click', function(e) {
	e.preventDefault();
	var modifier = {"titremodif" : $("#inputModif").val(), "textmodif" : $("#textareaModif").val()};
	var idmodif= $(this).data('id');
	console.log(idmodif);
	
	$("#inputModif").val("");
	$("#textareaModif").val("");
	
	$.ajax({
		url:'/update',
		method : 'POST',
		data: {
			id: id,
			value: JSON.stringify(modifier)
		}
	}).done(function(e){
		console.log(e);
	});
});
afficher();




$('#text').keyup(function(){

	var convertir = new showdown.Converter();
	text= $('#text').val();
	titre= $('#titre').val();
	var html= convertir.makeHtml(text);
	$("#text1").html(html);

});





