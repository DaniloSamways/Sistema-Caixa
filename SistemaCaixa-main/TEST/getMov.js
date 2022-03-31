function getMovimentos(url){
    let request = new XMLHttpRequest();
    request.open('GET', url, false)
    request.send();

    return request.responseText;
}

var saldo = 0

function criaLinha(movimento){
    var tipo = ""

    if(movimento.tipo == "E"){
        tipo = "table-success"
        saldo += parseFloat(movimento.valor)
        
    } else{
        tipo = "table-danger"
        saldo -= parseFloat(movimento.valor)
    }


    linha = document.createElement('tr')
    tdId = document.createElement('td')
    tdData = document.createElement('td')
    tdDescricao = document.createElement('td')
    tdValor = document.createElement('td')
    tdTipo = document.createElement('td')

    

    tdId.innerHTML = "<b>" + movimento.id + "</b>"
    tdData.innerHTML = movimento.data
    tdDescricao.innerHTML = movimento.descricao
    tdValor.innerHTML = "<b>R$</b> " + movimento.valor
    tdTipo.innerHTML = "<b>" + movimento.tipo + "</b>"

    linha.classList.add(tipo)

    linha.appendChild(tdId);
    linha.appendChild(tdData);
    linha.appendChild(tdDescricao);
    linha.appendChild(tdValor);
    linha.appendChild(tdTipo);

    return linha;
}

function main(){
    let data = getMovimentos('http://localhost:3000/API/movimentos');
    let movimentos = JSON.parse(data)

    let tabela = document.getElementById('tabela');

    movimentos.forEach(element => {
        let linha = criaLinha(element);
        tabela.appendChild(linha);
    })

    pSaldo = document.getElementById('saldo-txt')
    pSaldo.innerHTML += (saldo).toFixed(2);
}

main()