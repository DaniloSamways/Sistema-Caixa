function exists(url, dataTime) {
    let request = new XMLHttpRequest();
    let params = "dataTime=" + dataTime
    request.open('GET', url + "?" + params, false)
    request.send();

    return request.responseText;
}

function postSaldos(dataTime, valor) {
    let data1 = { "data": dataTime, "valor": valor }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data1)
    };
    fetch('http://localhost:3000/API/saldo/cadastrar', options)
}

function postMovimento(dataTime, descricao, valor, tipo) {
    let consulta = JSON.parse(exists('http://localhost:3000/API/saldo/verifica', dataTime)).exists;
    console.log(consulta)

    if (consulta == false) {
        console.log("NAO EXISTE | DATA: " + dataTime)
        postSaldos(dataTime, valor);
    } else {
        console.log("EXISTE | DATA: " + dataTime)
    }

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