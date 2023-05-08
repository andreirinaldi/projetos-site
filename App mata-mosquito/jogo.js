
var altura = 0   // 01 - definindo tamanho dinâmico da página
var largura = 0   // 01
var vidas = 1    // 08 - criando a variavel 'vidas' para tornar dinâmica a seleção dos corações de vida
var tempo = 15    // 10 - criando a variavel 'tempo'

var criaMosquitoTempo = 1500  // 13 - var para substituir o tempo fixo de geração de mosquitos

var nivel = window.location.search  // 13 - criando a var nível para declarar os parâmetros de dificildade
nivel = nivel.replace('?', '')  // 13 - removendo o caracter '?' da string declarando o nível selecionado

if(nivel === 'normal') {     // 13 - atribuindo tempo de 1,5s a dificildade 'normal'
	criaMosquitoTempo = 1500
} else if(nivel === 'dificil') {
	criaMosquitoTempo = 1000     // 13 - atribuindo tempo de 1,0s a dificildade 'dificil'
} else if(nivel === 'chucknorris') {
	criaMosquitoTempo = 750     // 13 - atribuindo tempo de 0,75s a dificildade 'chucknorris'
}

function ajustaTamanhoJogo() {    // 01
    altura = window.innerHeight    // 01 - (window.inner é usado para setar os valores de tamanho de tela)
    largura = window.innerWidth    // 01

    console.log(largura, altura)    // 01 - chamando os valores no console do navegador
}

ajustaTamanhoJogo()    // 01 - chamando a funcão 'ajustaTamanhoJogo'

var cronometro = setInterval(function() {    // 10 - criando o cronômetro
	tempo -= 1    // 10 - cronômetro que reduz em 1 a cada 1 segundos

	if(tempo < 0) {   // 10 - verificando se o tempo é menor que zero para evitar valores negativos
		clearInterval(cronometro)   // 10 - clear para que o cronômetro não continue sendo reduzido após a mensagem de vitória
		clearInterval(criaMosquito)   // 10 - clear para que os mosquitos não continuem a ser gerados após a mensagem de vitória
		// alert('Vitória')   // 10 - declaração de vítoria
		window.location.href = 'vitoria.html'   // 11 - substituindo o alert de vitória pela criação de uma página 'vitória.html'
	} else {
	document.getElementById('cronometro').innerHTML = tempo   // 10 - innerHTML é para inserir o valor da variável tempo dentro do span na pág 'app.html'
    }

}, 1000)

function posicaoRandomica() {   // 03 - encapsulando tudo dentro de uma função

	if(document.getElementById('mosquito')) {  // 06 - verificando de o id 'mosquito' existe antes de removelo
	    document.getElementById('mosquito').remove() // 06 - removendo o id 'mosquito' anterior (caso exista)
	    if(vidas > 3) {    // 08 - comando para adicionar o fim do jogo caso os três corações se tornem vazios
	    	window.location.href = 'fim_de_jogo.html'    // 09 - redirecionamento para a pagina de 'Game Over'

	    } else {
	    	document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png" // 08 - substituindo corações cheios por vazios
	   
	    vidas++    // 08 - adicionando o incremento para que os demais corações sejam afetados (v2 e v3)
	}
}
	
    var posicaoX = Math.floor(Math.random() * largura) - 90 // 02 - criando posições randômicas para os mosquitos
    var posicaoY = Math.floor(Math.random() * altura) - 90  // 02 - (Math.floor é usado para aredondar as coordenadas do Math.random)

    // -90 é pra corrigir o erro da imagem de 50px sumir da tela caso o valor randômico gerado for muito próximo ao limites possíveis da tela
    // o -90 gera um novo problema que é corrigido pelo código abaixo (posicaoX < 0 | posicaoY < 0)

    posicaoX = posicaoX < 0 ? 0 : posicaoX  // 03 - posicaoX recebe 0 se posicaoX for menor que 0 (negativa)
    posicaoY = posicaoY < 0 ? 0 : posicaoY  // 03 - posicaoY recebe 0 se posicaoY for menor que 0 (negativa)

    console.log(posicaoX, posicaoY)  // 02 - (posiçãoX = largura | posiçãoY = altura)


    var mosquito = document.createElement('img')  // 03 - criando o elemento html
    mosquito.src = 'imagens/mosquito.png'  // 03 - acionando os atributos do elemento recuperado
    // mosquito.className = 'mosquito1'   // 03 - adicionando a class 'mosquito1' a nova imagem gerada
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()  // 04 - substituindo a class 'mosquito1' pela randômica - 05 - adicionado a função de lados
    mosquito.style.left = posicaoX + 'px'   // 03 - formando a corrdenanda em pixels a esquerda do navegador
    mosquito.style.top = posicaoY + 'px'   // 03 - formando a corrdenanda em pixels no topo do navegador
    mosquito.style.position = 'absolute'   // 03 - definindo posição absoluta para que o elemento seja criando e posicionado de forma randômica
    mosquito.id = 'mosquito'   // 06 - adicionando o id 'mosquito'
    mosquito.onclick = function() {   // 08 - adicionando as lógicas de click sobre os mosquitos
    	this.remove()   // 08 - ação de remover o mosquito ao ser clicado | 'this' seleciona o arquivo 'mosquito'
    }

    document.body.appendChild(mosquito)  // 03 - adicionando um elemento filho para o body
}

function tamanhoAleatorio() {   // 04 - criando tamanhos variados para os mosquitos
	var classe = Math.floor(Math.random() * 3)   // 04 - Math.random cria valores entre 0 e 1, multipolicado por 3 os valores possíveis serão 0, 1, 2

	switch(classe) {   // 04 - utilizando switch para adicionar as classes diferentes aos mosquitos gerados
	case 0:
		return 'mosquito1'

	case 1:
		return 'mosquito2'

	case 2:
		return 'mosquito3'

	}
}

function ladoAleatorio() {   // 05 - gerando lados diferentes (virados para esquerda ou dirita) aos mosquitos gerados
	var classe = Math.floor(Math.random() * 2)

	switch(classe) {
	case 0:
		return 'ladoA'

	case 1:
		return 'ladoB'
	}
}