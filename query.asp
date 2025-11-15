
<%
'retorna os dados da empresa fazendo a pesquisa pelo nome
function sqlBusca(nome)
	if trim(nome) = "" then
		sqlBusca = "SELECT cod_menu, nome, cast(ordem as char) as ordem FROM tb_menu ORDER BY nome "
	else
		sqlBusca = "SELECT cod_menu, nome, cast(ordem as char) as ordem FROM tb_menu where nome like '%"&nome&"%' ORDER BY nome "
	end if
'response.Write sqlBusca
'response.End()
end function


'inserir um novo menu ou alterar 
function manter_dados_menu(nome,ordem,icone,codigo)

	if codigo <> "" then
		manter_dados_menu = "UPDATE tb_menu SET nome = '"&nome&"', ordem = "&ordem&", icon = '"&icone&"' where cod_menu = "&codigo&" "
	else
		manter_dados_menu = "INSERT INTO tb_menu (nome,ordem,icon) VALUES ('"&nome&"', "&ordem&", '"&icone&"') "
	end if	
end function

'retorna os dados de uma empresa pelo código da empresa
function retorna_dados_menu(menu)
	retorna_dados_menu = " select * from tb_menu where cod_menu = "&menu&" "
end function

function deleta_menu(menu)
	deleta_menu = "delete from tb_menu where cod_menu = "&menu&" "
end function

function Verificamenu(nome,codigo)
	sql = " select cod_menu from tb_menu where nome = '"&nome&"' "
	if codigo <> "" then
		sql = sql&" and cod_menu <> "&codigo&" "
	end if
	Verificamenu = sql
end function
%>