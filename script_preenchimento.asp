<%	
call abreconexao()
call abrers()
sql = retorna_dados_menu(request("codigo"))
call executars(sql)%>
	<script>
		document.form1.nome.value = "<%=rs("nome")%>";
		document.form1.ordem.value = "<%=rs("ordem")%>";
        document.form1.icone.value = "<%=rs("icon")%>";
	</script>
<%	
call fechars()
call fechaconexao()
%>