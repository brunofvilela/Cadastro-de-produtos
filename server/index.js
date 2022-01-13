const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')
const { application } = require('express')

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'produtosdb'
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/get', (req, res) => {
  const sqlSelect = 'SELECT * FROM produtos ORDER BY nome'
  db.query(sqlSelect, (err, result) => {
    res.send(result)
  })
})

app.post('/api/insert', (req, res) => {
  const nome = req.body.nome
  const descricao = req.body.descricao
  const valor = req.body.valor
  const disponivel = req.body.disponivel

  const sqlInsert =
    'INSERT INTO produtos (nome,descricao,valor,disponivel) VALUES (?,?,?,?)'
  db.query(sqlInsert, [nome, descricao, valor, disponivel], (err, result) => {
    console.log(result)
  })
})

app.delete('/api/delete/:idprodutos', (req, res) => {
  const pidprodutos = req.params.idprodutos
  const sqlDelete = 'DELETE FROM produtos WHERE idprodutos = ?'
  db.query(sqlDelete, pidprodutos, (err, result) => {
    if (err) console.log(err)
  })
})

app.put('/api/update', (req, res) => {
  const pidprodutos = req.body.idprodutos
  const pvalor = req.body.valor
  const sqlUpdate = 'UPDATE produtos SET valor = ? WHERE idprodutos = ?'
  db.query(sqlUpdate, [pvalor, pidprodutos], (err, result) => {
    if (err) console.log(err)
  })
})

app.listen(3001, () => {
  console.log('Rodando na porta 3001')
})
