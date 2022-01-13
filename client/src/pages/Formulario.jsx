import React, { useState, useEffect } from 'react'
import '../styles/Global.css'
import Axios from 'axios'
import Button from '../components/Button'

function Formulario() {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [disponivel, setDisponivel] = useState('')
  const [produtosList, setProdutosList] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then(response => {
      setProdutosList(response.data)
    })
  })

  const salvar = () => {
    Axios.post('http://localhost:3001/api/insert', {
      nome: nome,
      descricao: descricao,
      valor: valor,
      disponivel: disponivel
    })

    setProdutosList([...produtosList, { nome: nome, valor: valor }])
  }

  return (
    <>
      <div className="form1">
        <div className="titulo1">Cadastro de produtos</div>
        <hr></hr>
        <div className="campo1">
          <label>Nome do produto:</label>
          <p />
          <input
            type="text"
            placeholder="Digite o nome do produto"
            name="nome"
            onChange={e => {
              setNome(e.target.value)
            }}
          />
        </div>
        <div className="campo1">
          <label>Descrição:</label>
          <p />
          <input
            type="text"
            placeholder="Digite a descrição do produto"
            id="descricao"
            name="descricao"
            onChange={e => {
              setDescricao(e.target.value)
            }}
          />
        </div>
        <div className="campo1">
          <label>Valor:</label>
          <p />
          <input
            type="number"
            step="0.01"
            min="0.01"
            placeholder="Digite o valor do produto"
            name="valor"
            onChange={e => {
              setValor(e.target.value)
            }}
          />
        </div>
        <div className="campo1">
          <label>Disponível para venda?</label>
          <p />
          <input
            type="text"
            placeholder="Sim ou Nao"
            name="disponivel"
            onChange={e => {
              setDisponivel(e.target.value)
            }}
          />
        </div>
        <Button className="Botao" onClick={salvar}>
          Cadastrar
        </Button>
      </div>
      </>
  )
}
export default Formulario
