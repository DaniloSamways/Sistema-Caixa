var express = require('express');
var app = express();
var db = require('../DATABASE/db');
var cadMovimento = require('../DATABASE/models/cadMovimento')
var cadSaldo = require('../DATABASE/models/cadSaldo')
var movimento = require('../DATABASE/models/movimentos');
var cors = require('cors');
var saldo = require('../DATABASE/models/saldo');
var sequelize = require('sequelize');

const { Op, QueryTypes } = require('@sequelize/core');
const { type } = require('express/lib/response');

app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,POST');
    app.use(cors());
    next();
})

app.get('/API/movimentos', function (req, res) {
    movimento.findAll({
        attributes: ['id', 'data', 'descricao', 'valor', 'tipo']
    }).then(function (dados) {
        res.json(dados)
    });
});

app.get('/API/saldo', function (req, res) {
    saldo.findAll({
        attributes: ['id', 'data', 'valor']
    }).then(function (dados) {
        res.json(dados)
    });
})

app.get('/API/saldo/verifica', function (req, res) {

    saldo.findAll({
        where: {
            data: req.query.dataTime
        },
        attributes: ['id', 'data', 'valor']
    }).then(function (dados) {

        var dadosLen = JSON.stringify(dados).length;
        if (dadosLen > 2) {
            res.json({ 'exists': true })
        } else {
            res.json({ 'exists': false })
        }


    });



});

app.post('/API/movimentos/cadastrar', function (req, res) {
    const novoMovimento = cadMovimento.create({
        data: req.body.data,
        descricao: req.body.descricao,
        valor: req.body.valor,
        tipo: req.body.tipo
    }).then(() => {
        res.json({ "Success": true, "Message": "Movimento Cadastrado com Sucesso" })
        console.log('ok')
    }).catch(err => {
        res.json({ "Success": false, "Message": err.message })
        console.log('false')
    })
})

app.post('/API/movimentos/testeCad', function (req, res) {
    let dataTime = req.body.data
    let valorA = req.body.valor
    let tipo = req.body.tipo
    if (tipo == "E") {
        tipo = '+'
    } else {
        tipo = '-'
    }
    cadSaldo.update({
        valor: sequelize.literal('valor ' + tipo + ' ' + valorA)
    }, {
        where: {
            data: {
                [Op.gte]: dataTime
            }
        }
    })

})

app.post('/API/saldo/cadastrar', function (req, res) {
    const novoSaldo = cadSaldo.create({
        data: req.body.data,
        valor: req.body.valor
    }).then(() => {
        res.json({ "Success": true, "Message": "Saldo Cadastrado com Sucesso" })
    }).catch(err => {
        res.json({ "Success": false, "Message": err.message })
    })


})



app.listen('3000', () => {
    console.log('Listening on http://localhost:3000');
});

db.sync();