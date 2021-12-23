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
  const sqlSelect = 'SELECT * FROM produtos ORDER BY valor DESC'
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

app.delete('/api/delete/:nome', (req, res) => {
  const pnome = req.params.nome
  const sqlDelete = 'DELETE FROM produtos WHERE nome = ?'
  db.query(sqlDelete, pnome, (err, result) => {
    if (err) console.log(err)
  })
})

app.put('/api/update', (req, res) => {
  const pnome = req.body.nome
  const pvalor = req.body.valor
  const sqlUpdate = 'UPDATE produtos SET valor = ? WHERE nome = ?'
  db.query(sqlUpdate, [pvalor, pnome], (err, result) => {
    if (err) console.log(err)
  })
})

app.listen(3001, () => {
  console.log('Rodando na porta 3001')
})
