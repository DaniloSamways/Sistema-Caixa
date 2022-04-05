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
const { type, json } = require('express/lib/response');

app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,POST');
    app.use(cors());
    next();
})

app.get('/API/movimentos', function (req, res) {
    movimento.findAll({
        attributes: ['id', 'data', 'descricao', 'valor', 'tipo'],
        order: [
            ['data', 'ASC']
        ]
    }).then(function (dados) {
        res.json(dados)
    });
});

app.get('/API/movimentos/filtro', function (req, res) {
    let dataInicial = req.query.dataInicial;
    let dataFinal = req.query.dataFinal;

    movimento.findAll({
        attributes: ['id', 'data', 'descricao', 'valor', 'tipo'],
        order: [
            ['data', 'ASC']
        ],
        where: {
            data: {
                [Op.gte]: dataInicial,
                [Op.lte]: dataFinal
            }
        }
    }).then(function (dados) {
        res.json(dados)
    });
});

app.get('/API/saldo', function (req, res) {
    saldo.findAll({
        attributes: ['id', 'data', 'valor'],
        order: [
            ['data', 'ASC']
        ]
    }).then(function (dados) {
        res.json(dados)
    });
})

app.get('/API/saldo/verifica', function (req, res) {
    console.log('- saldo/verifica')

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

app.get('/testeSaldo', async function (req, res) {
    var existeSaldo = await cadSaldo.findOne({
        where: {
            data: '04-04-2020'
        }
    })
    existeSaldo = JSON.stringify(existeSaldo).length;
    res.json(existeSaldo);
})

app.post('/API/movimentos/cadastrar', async function (req, res) {
    console.log('- movimentos/cadastrar')

    const ultimoSaldo = await cadSaldo.findOne({
        attributes: ['valor'],
        where: {
            data: {
                [Op.lt]: req.body.data
            }
        },
        raw: true,
        order: [
            ['data', 'DESC']
        ]
    })

    var existeSaldo = await cadSaldo.findOne({
        where: {
            data: '04-04-2020'
        }
    })
    existeSaldo = JSON.stringify(existeSaldo).length;
    if(existeSaldo <= 4){
        const novoSaldo = cadSaldo.create({
            data: req.body.data,
            //valor: req.body.valor + valorUltimoSaldo 
            valor: sequelize.literal(valorUltimoSaldo + ' ' + tipo + ' ' + req.body.valor)
        })
    }

    let tipo = req.body.tipo;
    if (tipo == "E") {
        tipo = '+'
    } else {
        tipo = '-'
    }

    var valorUltimoSaldo;

    if(ultimoSaldo == null){
        valorUltimoSaldo = 0; // NAO EXISTE, ENTAO O VALOR É 0
        console.log("NAO EXISTE SALDO")
        
    }else{ // EXISTE O SALDO
        console.log(JSON.parse(JSON.stringify(ultimoSaldo)))
        valorUltimoSaldo = JSON.parse(JSON.stringify(ultimoSaldo)).valor
        console.log("EXISTE SALDO")
    }
    
    console.log("Ultimo Saldo: "+valorUltimoSaldo+"\n Valor Req Body: "+req.body.valor)

    

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

    console.log("Novo Saldo Cadastro: "+valorUltimoSaldo+" "+tipo+" "+req.body.valor)
})

app.post('/API/movimentos/testeCad', function (req, res) {
    console.log('- movimentos/TesteCad');

    let dataTime = req.body.data
    let valorA = req.body.valor
    let tipo = req.body.tipo
    let first = req.body.first;

    if (tipo == "E") {
        tipo = '+'
    } else {
        tipo = '-'
    }

    if (first == true) {
        console.log("UPDATE ( > ) -> Valor: "+valorA+" | Tipo: "+tipo)

        cadSaldo.update({
            valor: sequelize.literal('valor ' + tipo + ' ' + valorA)
        }, {
            where: {
                data: {
                    [Op.gt]: dataTime
                }
            }
        })
    } else {
        console.log("UPDATE ( >= ) -> Valor: "+valorA+" | Tipo: "+tipo)

        cadSaldo.update({
            valor: sequelize.literal('valor ' + tipo + ' ' + valorA)
        }, {
            where: {
                data: {
                    [Op.gte]: dataTime
                }
            }
        })
    }

})



app.listen('3000', () => {
    console.log('Listening on http://localhost:3000');
});

db.sync();