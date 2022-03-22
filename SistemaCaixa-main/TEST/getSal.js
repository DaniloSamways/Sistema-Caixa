function getSaldos(url){
    let request = new XMLHttpRequest();
    request.open('GET', url, false)
    request.send();

    return request.responseText;
}

let saldoTotal = 0

function criaLinha(saldo){
    saldoTotal += saldo.valor

    linha = document.createElement('tr')
    tdId = document.createElement('td')
    tdData = document.createElement('td')
    tdValor = document.createElement('td')

    tdId.innerHTML = "<b>" + saldo.id + "</b>"
    tdData.innerHTML = saldo.data
    tdValor.innerHTML = "<b>R$ </b>" + saldo.valor

    linha.appendChild(tdId);
    linha.appendChild(tdData);
    linha.appendChild(tdValor);

    return linha;
}

function main(){
    let data = getSaldos('http://localhost:3000/API/saldo');
    let saldos = JSON.parse(data)

    let tabela = document.getElementById('tabela');

    saldos.forEach(element => {
        let linha = criaLinha(element);
        tabela.appendChild(linha);
    })

    pSaldo = document.getElementById('saldo-txt')
    pSaldo.innerHTML += (saldoTotal).toFixed(2);
}

main()