function exists(url, dataTime) {
    let request = new XMLHttpRequest();
    let params = "dataTime=" + dataTime
    request.open('GET', url + "?" + params, false)
    request.send();

    return request.responseText;
}

function postMovimento(dataTime, descricao, valor, tipo) {
    let consulta = JSON.parse(exists('http://localhost:3000/API/saldo/verifica', dataTime)).exists;

    var first;

    if (consulta == false) {
        first = true; // É O PRIMEIRO SALDO
    } else {
        first = false; // NAO É O PRIMEIRO SALDO
    }
    
    const options2 = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "data": dataTime, "valor": valor, "tipo": tipo, "first": first})
    };
    fetch('http://localhost:3000/API/movimentos/testeCad', options2)

    let data = { "data": dataTime, "descricao": descricao, "valor": parseFloat(valor), "tipo": tipo }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch("http://localhost:3000/API/movimentos/cadastrar", options)

    
}
