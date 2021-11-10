/*
var P=new Object();
P.visao="4";
P.hora=6;
var TP=new Object();
TP.visao="4";

setInterval( function() {
	console.log("pegando valor P");
	$.get('/jogar/x', function(res) {
        P = res;
    });
}, 1000 );


setInterval( function() {
	


	var luz = (P.hora * 15);
	if(luz > 120 ){ luz = luz - ((luz - 120) * 2); }//virada da tarde
	if(luz < 45 ){ luz = 45;	}//luz minima
	
	var contraste= P.hora;

	if((contraste <= 4)||(contraste >= 20))
	{
		contraste = 40;
	}
	else
	{
		if((contraste >= 18)||(contraste <= 9))
		{
			contraste = 100;
		}
		else
		{
			contraste = P.hora * 10;
		}
	}
	var hora = P.hora;
	if(hora > 18)
	{
		hora = hora - ((hora - 18) * 2 ); 
	}
	
	var sombra = ( 12 - hora) * 6; 


	$(".cNoiteDia").css({
		"filter":"brightness(" + luz + "%)  contrast(" +  contraste + "%)"
	});

	$(".sombra").css({
		"filter":"drop-shadow( " + sombra + "px " + sombra + "px 14px #000000 )"
	});

	
	$(".cNoiteDia.sombra").css({
		"filter":" drop-shadow( " + sombra + "px " + sombra + "px 14px #000000 ) brightness(" + luz + "%)"
	});

	
}, 1000 );

setInterval( function() {
	
	if(TP.visao != P.visao)
	{
		console.log("atualizando visao nivel: " + P.visao);
		var t = ((P.visao - 16 )* -1) * 100; 
	    $("#all").animate(
	    {
			"height": t+"%",
			"width": t+"%"
	    },3000);
	    TP.visao = P.visao;
	}

}, 1000 );
*/
//ao iniciar gerenciar plano de cenario
function objModel(imagem,rotacao,opacidade){ 
	this.imagem=".",
	this.rotacao=0,
	this.opacidade=1.0
	this.espelhar=0;
}

var largura=10;
var altura=10;
var obj = new Array();// = new [altura][largura];
var escolha = new objModel();

var n_blocos = 71;



function startup(a,l)
{

	for(var y=1; y < a;y++){
		obj[y] = new Array();
		for(var x=1; x < l;x++){
			obj[y][x] = new objModel();
			console.log("x="+x+" y=" + y);
		}
	}
	for(var y=1; y < a;y++){
		$("#cenario").append("<div class='y' id='y"+y+"'>");

		for(var x=1; x < l;x++){
			$("#cenario #y"+y).append("<div class='ig' id='"+ x +"l"+y+"'></div>");
			console.log("x="+x+" y=" + y);
		}
	}
}
function startup_desenvolvedor()
{
	for(var i=1; i < n_blocos;i++){
		$("#desenvolver #objetos").append("<img src='cenario/objetos/"+i+".png' id='oc"+i+"' class='oc'>");
		console.log("objeto " + i + " setado!");
	}
}
startup(altura,largura);
startup_desenvolvedor();

function limpar_selecao_oc_desenvolvedor()
{
	$(".oc").css({
        "filter":"none"
    });
}

//clicar o bloco
$(".oc").click(
	function(){
		escolha.imagem = $(this).attr("src");
		escolha.rotacao = 0;
		escolha.opacidade=1;
		escolha.espelhar=0;
		AtualizaSelecao();
		limpar_selecao_oc_desenvolvedor();
		$(this).css({"filter": "invert(130%)"});
	}
);
//clicar no bloco da grade 
$(".ig").click(
	function(){
		var L = $(this).attr("id").split("l");
		console.log(L);
		obj[L[1]][L[0]].imagem=escolha.imagem;
		obj[L[1]][L[0]].opacidade=escolha.opacidade;
		obj[L[1]][L[0]].rotacao=escolha.rotacao;
		obj[L[1]][L[0]].espelhar=escolha.espelhar;
		console.log(".ig x:" + L[0] + " y:" + L[1]);
		AtualizaItemGrade(L[0],L[1]);
	}
//clicar em espelhar o bloco
);$("#desenvolver #opcoes  #selecionado #espelhar").click(
	function(){
		escolha.espelhar++;
		AtualizaSelecao();
	}
);
//limpa/deletar blocos
$("#desenvolver #opcoes #limpa").click(
	function(){
		limpar_selecao_oc_desenvolvedor();
		escolha.imagem = "";
		escolha.rotacao = 0;
		escolha.opacidade = 1;
		escolha.espelhar=0;
		AtualizaSelecao();
	}
);
//roda selecao
$("#desenvolver #opcoes  #selecionado #rodar").click(
	function(){
		escolha.rotacao = escolha.rotacao + 90;
		AtualizaSelecao();	
	}
);
//deleta algo da grade
$("#desenvolver #opcoes #delete").click(
	function(){
		escolha.imagem = "icons/lixo.png";
		escolha.rotacao = 0;
		escolha.opacidade =1;
		AtualizaSelecao();	
		limpar_selecao_oc_desenvolvedor();
			
	}
);

function AtualizaItemGrade(x,y)
{
	$("#cenario #y" + y + " #" + x + "l" + y).css({
		//"opacity":obj[y][x].opacidade,
		"background-image":"url("+obj[y][x].imagem+")",
		"transform":"rotateY("+obj[y][x].espelhar * 180 +"deg) rotate("+obj[y][x].rotacao+"deg)"
	});
	console.log("atualizado: " + x + ":" + y);
}
function AtualizaSelecao()
{
	$("#desenvolver #opcoes  #selecionado #imagem").css({
		//"opacity":selecionado.opacidade,
		"background-image":"url("+escolha.imagem+")",
		"transform":"rotateY("+escolha.espelhar * 180 +"deg) rotate("+escolha.rotacao+"deg)"
	});
}


$("#btn_gerCode").click(function(){gerarCodigo()});
function gerarCodigo()
{
	var code = "";
	for(var y=1; y < altura;y++){
		
		for(var x=1; x < largura;x++){
			code = code + "rotacao:" + obj[y][x].rotacao + ";";
			code = code + "imagem:" + obj[y][x].imagem + ";";
			code = code + "opacidade:" + obj[y][x].opacidade+ ";";
			code = code + "espelhar:" + obj[y][x].espelhar;
			code = code + "--x--";
		}
		code = code + "--y--";
	}
	$("#code").css({"height":"80%","width":"70%"});
	$("#code").append(code)
}
/*
	for(var y=1; y < altura;y++){
		obj[y] = new Array();
		for(var x=1; x < largura;x++){
			obj[y][x] = new objModel();
			console.log("x="+x+" y=" + y);
		}
	}
	for(var y=1; y < altura;y++){
		$("#cenario").append("<div class='y' id='y"+y+"'>");

		for(var x=1; x < largura;x++){
			$("#cenario #y"+y).append("<div class='ig' id='"+ x +"l"+y+"'></div>");
			console.log("x="+x+" y=" + y);
		}
	}*/
$("#tamanhoQuadro #set").click(
	function()
	{
		alterarTamanhoGrade($("#tamanhoQuadro #Y").val(),$("#tamanhoQuadro #Y").val())
	}
);
function alterarTamanhoGrade(newAltura,newLargura)
{

	$(".y").remove();
	var velhaM=obj;
	startup(newAltura,newLargura);
	altura=newAltura;
	largura=newLargura;
	for(var y=1; y < altura;y++){
		if(typeof (velhaM[y]) != "undefined"){
			for(x=1; x < largura;x++){
				if(typeof (velhaM[y][x]) != "undefined")
				{
					obj[y][x] = velhaM[y][x];
				}
			}
		}
	}

/*
	if(newLargura > largura) //aumentar X
	{
		
		for(var y=1; y < altura;y++){
			for(x=largura; x < newLargura;x++){
				$("#cenario #y"+y).append("<div class='ig' id='"+ x +"l"+y+"'></div>");
				obj[y][x] = new objModel();
			}
		}
	}
	else if(newLargura < largura) //diminuir X
	{
		for(var y=1; y < altura;y++){
			for(x=newLargura; x < largura;x++){
				$("#cenario #y"+y +" #"+x+"l"+y).remove();
				obj[y][x]=new Boolean();
			}
		}
		
	}
	if(newAltura > altura) //aumentar Y
	{
		for(var y=altura; y < newAltura;y++){

			$("#cenario").append("<div class='y' id='y"+y+"'>");
			obj[y] = new Array();
			for(x=1; x < newLargura;x++){
				$("#cenario #y"+y).append("<div class='ig' id='"+ x +"l"+y+"'></div>");
				obj[y][x] = new objModel();
			}
		}
		
	}
	else if (newAltura < altura) //diminuir Y
	{
		
		for(var y=newAltura; y < altura;y++){
			$("#cenario #y"+y).remove();
			obj[y]=null;
		}
	}
	altura=newAltura;
	largura=newLargura;
*/
}
