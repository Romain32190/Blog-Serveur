var textarea = $("textarea").val("");
var input = $("input").val("");

function afficher(){

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
			$('#contenu').append('<li >'+data[i].titre+' <button  value="'+data[i]._id+'" class="waves-effect waves-light btn-small red supprimer">Supprimer</button><button value="'+data[i]._id+'" class="waves-effect waves-light btn-small blue modifier">Modifier</button></li>');
		}
		$('.supprimer').click(function(){
			var id = $(this).attr('value');
			console.log(id);

			$.ajax({
				url:'/delete',
				data: {
					_id: id,
				}
			});

		});

	});
}

afficher();

$('#text').keyup(function(){

	var convertir = new showdown.Converter();
	text= $('#text').val();
	titre= $('#titre').val();
	var html= convertir.makeHtml(text);
	$("#text1").html(html);

});





