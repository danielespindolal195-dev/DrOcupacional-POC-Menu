
function confere_dados (form,acao) {
	form.action.value = acao;
	
	if (form.nome.value == "") {
		alert("É necessário informar o nome do menu!");
		form.nome.focus();
		return false;
	}
	if (form.ordem.value == "") {
		alert("É necessário informar a ordem do menu!");
		form.ordem.focus();
		return false;
	}
	if (form.icone.value == "") {
	    alert("É necessário informar o Ícone do menu!");
	    form.icone.focus();
	    return false;
	}
	return true;		
}

function envia(form,acao)
{
	if (confere_dados(form,acao)) {
		form.action.value=acao;
		form.submit();
	}		
}

function pesquisa(form)
{
	var nome = form.nome.value;
	form.acao.value = "BUSCA";
	form.submit();
}

function alterar(menu)
{
	url="cad_menu.asp?action=Alterar&codigo=" + menu;
	location.href=url;	
}

function excluir(menu)
{
	 if (confirm("Deseja realmente excluir este menu?")) {
		url="grava_menu.asp?action=Excluir&codigo=" + menu;
		location.href=url;	
	}
}