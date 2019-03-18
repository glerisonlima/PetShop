// autocomplete
$("#autocomplete-input").autocomplete({
	source: function(request, response){
		$.ajax({
			method: "GET",
			url: "/cliente/nome",
			data: {
				nome: request.term
			},
			success: function(result){
				response(result);
			}
		});
	}
});

$('#myModal').on('shown.bs.modal', function () {
	  $('#myInput').trigger('focus')
})