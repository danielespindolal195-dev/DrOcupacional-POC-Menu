<!--#include file="query.asp"-->

<%
Response.ContentType = "text/html"
Response.AddHeader "Content-Type", "text/html;charset=UTF-8"
Response.CodePage = 65001
Response.CharSet = "UTF-8"

if request("action") = "CONFIRMAR" then
		
	call abreconexao()

	'verificar pelo nome se já existe cadastro deste menu
	sql = VerificaMenu(request("nome"),request("codigo"))
	call abrers()
	call executars(sql)
	if not rs.eof then
		call fechars()
		call fechaconexao()
		Response.Write "<script charset='utf-8'>alert('Este menu já Existe!');history.back(-1);</script>"
		Response.End()
	end if
	call fechars()
			
	
	sql = manter_dados_menu(request("nome"),request("ordem"),request("icone"),request("codigo"))

	call executaconexao(sql)
	call fechaconexao()
	
		
	if request("codigo") = "" then
		Response.Write "<script charset='utf-8'>alert('Menu incluído com sucesso!');window.location='lista_menu.asp';</script>"		
	else
		Response.Write "<script charset='utf-8'>alert('Menu Alterado com sucesso!');window.location='lista_menu.asp';</script>"	
	end if	
end if

if request("action") = "Excluir" then

	call abreconexao()
	sql = deleta_menu(request("codigo"))
	call executaconexao(sql)
	call fechaconexao()
	Response.Write "<script charset='utf-8'>alert('Menu excluído com sucesso!');window.location='lista_menu.asp';</script>"		
	
end if
%>