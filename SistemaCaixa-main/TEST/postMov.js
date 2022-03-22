import { postSaldos } from '../TEST/postSal'

function exists(url) {
    let request = new XMLHttpRequest();
    request.open('GET', url, false)
    request.send();

    return request.responseText;
}

function postMovimento(dataTime, descricao, valor, tipo) {
    let consulta = JSON.parse(exists('http://localhost:3000/API/saldo/verifica')).exists;
    console.log(consulta)

    if (consulta == false) {
        postSaldos(dataTime, parseFloat(valor));
    }

    /*(const data = { "data": dataTime, "descricao": descricao, "valor": parseFloat(valor), "tipo": tipo }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        fetch("http://localhost:3000/API/movimentos/cadastrar", options)
        */
}

module.exports = postMovimento;