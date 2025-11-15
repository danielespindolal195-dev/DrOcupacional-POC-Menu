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
                                    <form name="form1" method="post" action="grava_menu.asp">
                                    <input type="hidden" name="action">
                                    <input type="hidden" name="codigo" value="<%=request("codigo")%>">

                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Nome do Menu: </label>
                                            <div class="form-group">
                                                <input class="form-control" placeholder="Informe o Nome do Menu..." name="nome" id="nome"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Ordem: </label>
                                            <div class="form-group">
                                                <input class="form-control" placeholder="Informe a Ordem Menu..." name="ordem" id="ordem"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <label>Ícone: </label>
                                            <div class="form-group">
                                                <input class="form-control" placeholder="Informe o Ícone do Menu..." name="icone" id="icone"/>
                                            </div>
                                        </div>
                                    </div>

                                    <hr />
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <a class="btn btn-primary btn-primary-m pull-left" href="#b"
                                                    onclick="javascript:envia(document.form1, 'CONFIRMAR');"
                                                    <strong> Salvar</strong>
                                                </a>
                                                <a class="btn btn-primary btn-primary-m pull-right" href="lista_menu.asp"
                                                    <strong> Voltar</strong>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <%if request("action") = "Alterar" then%>	                
	                                    <!--#include file="script_preenchimento.asp"-->
                                    <%end if%>                                           
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
