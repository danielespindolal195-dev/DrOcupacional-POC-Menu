<!--#include file="query.asp"-->
<!DOCTYPE html>
<html>

<%call Estilos()%>
<script src="menu.js"></script>

<body class="animsition">

    <div class="page-wrapper">

        <%call Menu()%>
        <!-- PAGE CONTAINER-->
        <div class="page-container">
            <%call Topo()%>


            <!-- MAIN CONTENT-->
            <div class="main-content">
                <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <!--TITULO-->
                        <div class="row">
                            <div class="col-md-12">
                                <div class="overview-wrap">
                                    <h2 class="title-1"><i class="fa fa-wrench"></i> Cadastro Menu</h2>
                                    <button class="au-btn au-btn-icon au-btn--blue" onclick="javascript:location.href='cad_menu.asp'">
                                        <i class="zmdi zmdi-plus"></i>Adicionar Novo</button>
                                </div>
                            </div>
                        </div>
                        <!--FIM TITULO-->
                        
                        <br class="clear" />
						<div class="row">
							<div class="col-md-12">
                			<!--Conteudo Página-->
								
								<div class="card">
					  				<div class="card-body">
                                        <form name="form1" method="post" action="lista_menu.asp">
                                        <input type="hidden" name="acao" value="<%=request("acao")%>">
                                        <input type="hidden" name="action" />
                                        <input type="hidden" name="codigo" />

										<div class="row">
                                            <div class="col-md-6">
                                                <label>Nome do Menu: </label>
                                                <div class="form-group">
                                                    <input class="form-control" placeholder="Informe o Nome do Menu..." name="nome" id="nome"/>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <label>&nbsp;</label>
                                                <div class="form-group">
                                                    <button type="button" class="btn btn-primary" onclick="pesquisa(document.form1)">
                                                        <span class="fa fa-search"></span> Busca
                                                    </button>

                                                </div>
                                            </div>
										</div>    

                                        <!-- Busca-->
                                        <%
                                        if request("acao") = "BUSCA" then
                                            sql = sqlBusca(request("nome"))
                                            call abreconexao()
                                            call abrers()
                                            call executars(sql)
                                        %>
                                        <div class="row">
                                        <br class="clear" />
                                        <div class="col-lg-12">
                                            <div class="table-responsive">
                                                <table class="table table-striped table-bordered table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Menu</th>
                                                            <th>Ordem</th>
                                                            <th>Opções</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    <%while not rs.eof%>
                                                        <tr>
                                                        <td><%=rs("nome")%></td>
                                                        <td><%=rs("ordem")%></td>
                                                        <td>
                                                        <a href="#b"
                                                            onclick="javascript:alterar('<%=rs("cod_menu")%>');"><span class="fa fa-pencil-square-o fa-lg"></span></a>&nbsp;&nbsp;
                                                        <a href="#b"
                                                            onclick="javascript:excluir('<%=rs("cod_menu")%>');"><span class="fa fa-trash-o fa-lg"></span></a>
                                                        </td>
                                                        </tr>
                                                    <%
	                                                rs.movenext
	                                                wend
	                                                call fechars()
	                                                call fechaconexao()
                                                    %>                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        </div>
                                        <%end if%>
                                        <!-- Fim Busca-->

										</form>

									</div>
								</div>
							</div>
                            <!--Conteudo Página-->
						</div>


                    </div>
                </div>
            </div>
            <!-- END MAIN CONTENT-->

        
        <!-- END PAGE CONTAINER-->
        </div>
    
    </div>
    
    <%call Scripts()%>

</body>
</html>
