$(document).ready(function () { 
    var $cpf = $("#cpf");
    $cpf.mask('000.000.000-00', {reverse: false});
});

$(document).ready(function () { 
    var $tel1 = $("#tel1");
    $tel1.mask('(00) 0000-0000', {reverse: false});
});
$(document).ready(function () { 
    var $tel2 = $("#tel2");
    $tel2.mask('(00) 0000-0000', {reverse: false});
});
$(document).ready(function () { 
    var $cel = $("#cel");
    $cel.mask('(00) 00000-0000', {reverse: false});
});
$(document).ready(function () { 
    var $whatsapp = $("#whatsapp");
    $whatsapp.mask('(00) 00000-0000', {reverse: false});
});
$(document).ready(function () { 
    var $cnpj = $("#cnpj");
    $cnpj.mask('00.000.000/0000-00', {reverse: false});
});
$(document).ready(function () { 
    var $rg = $("#rg");
    $rg.mask('0000000000000', {reverse: false});
});
$(document).ready(function () { 
	$("#f").attr('checked',true);
	$("#cpf_cnpj").mask('000.000.000-00', {reverse: false});
	$("#rg_ie").mask('00000000000000000000', {reverse: false});
});

$(document).ready(function () { 
	$("#f").on('click', function(){
		$("#lb_cpf_cnpj").text("Cpf");
		$("#lb_rg_ie").text("Rg");
		$("#cpf_cnpj").mask('000.000.000-00', {reverse: false});
	});
	$("#j").on('click', function(){
		$("#lb_cpf_cnpj").text("Cnpj");
		$("#lb_rg_ie").text("Ie");
		$("#cpf_cnpj").mask('00.000.000/0000-00', {reverse: false});
	});
});

$(document).ready(function() {
	function limpa_formulário_cep() {
	// Limpa valores do formulário de cep.
		$("#endereco").val("");
		$("#bairro").val("");
		$("#cidade").val("");
		$("#estado").val("");
	}
	//Quando o campo cep perde o foco.
$("#cep").blur(function() {
//Nova variável "cep" somente com dígitos.
	var cep = $(this).val().replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {
//Expressão regular para validar o CEP.
	var validacep = /^[0-9]{8}$/;
	//Valida o formato do CEP.
	if (validacep.test(cep)) {
		//Preenche os campos com "..." enquanto consulta webservice.
		$("#endereco").val(
				"...");
		$("#bairro").val("...");
		$("#cidade").val("...");
		$("#estado").val("...");

		//Consulta o webservice viacep.com.br/
		$.getJSON("https://viacep.com.br/ws/"+ cep+ "/json/?callback=?",
			function(dados) {
				if (!("erro" in dados)) {
					//Atualiza os campos com os valores da consulta.
					$("#endereco").val(dados.logradouro);
					$("#bairro").val(dados.bairro);
					$("#cidade").val(dados.localidade);
					$("#estado").val(dados.uf);
				} //end if.
				else {
				//CEP pesquisado não foi encontrado.
					limpa_formulário_cep();
					alert("CEP não encontrado.");
				}
		});
	} //end if.
	else {
		//cep é inválido.
		limpa_formulário_cep();
		alert("Formato de CEP inválido.");
	}
} //end if.
else {
	//cep sem valor, limpa formulário.
		limpa_formulário_cep();
	}
});
});

$("#form-cliente-novo").submit(function(evt) {
	//bloquear o comportamento padrão do submit
	evt.preventDefault();
	
	var cliente = {};
	cliente.id = $("#id").val();
	cliente.nome = $("#nome").val();
	cliente.apelido = $("#apelido").val();
	cliente.cep = $("#cep").val();
	cliente.endereco = $("#endereco").val();
	cliente.numero = $("#numero").val();
	cliente.bairro = $("#bairro").val();
	cliente.cidade = $("#cidade").val();
	cliente.estado = $("#estado").val();
	cliente.tel1 = $("#tel1").val();
	cliente.tel2 = $("#tel2").val();
	cliente.cel = $("#cel").val();
	cliente.whatsapp = $("#whatsapp").val();
	cliente.email = $("#email").val();
	if($("#f").prop("checked") === true){
		cliente.tipo = "F";
	}else{
		cliente.tipo = "J";
	}
	cliente.cpf_cnpj = $("#cpf_cnpj").val();
	cliente.rg_ie = $("#rg_ie").val();
	cliente.complemento = $("#complemento").val();
	cliente.dataNascimento = $("#dataNascimento").val();
	cliente.status = $("#status").val();
	console.log('cliente > ', cliente);
	
	$.ajax({
		method: "POST",
		url: "/cliente",
		data: cliente,
		beforeSend: function(){
			$("#loading-circle").css("display", "block");
		},
		success: function(){
			window.location = "/clientes";
		},
		complete: function(){
			$("#loading-circle").fadeOut(800, function() {
				
				$("#loading-circle").css("display", "none");
			});			
		}
	})
});
