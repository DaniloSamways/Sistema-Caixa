function postSaldos(data, valor) {
    const data = { "data": data, "valor": valor }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('http://localhost:3000/API/saldo/cadastrar', options)
}