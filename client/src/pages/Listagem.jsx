import React, { useState, useEffect } from 'react';
import '../styles/Global.css';
import Axios from 'axios';
import Button from '../components/Button';

function Listagem() {
  const [produtosList, setProdutosList] = useState([])
  const [novoValor, setNovoValor] = useState('')

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then(response => {
      setProdutosList(response.data)
    })
  })

  const deleteProdut = pidprodutos => {
    Axios.delete(`http://localhost:3001/api/delete/${pidprodutos}`)
  }

  const updateProdut = pidprodutos => {
    Axios.put('http://localhost:3001/api/update', {
      idprodutos: pidprodutos,
      valor: novoValor
    })
    setNovoValor('')
  }

  return (
    <>
      <h1>Listagem dos produtos: </h1>
      <section className="listaProdutos">
        {produtosList.map(val => {
          return (
            <div className="card">
              <h1>Nome: {val.nome}</h1>
              <p>Marca: {val.descricao}</p>
              <p>Valor: R$ {val.valor}</p>

              <Button
                className="btDeletar"
                onClick={() => {
                  deleteProdut(val.idprodutos)
                }}
              >
                Deletar
              </Button>
              <input
                type="text"
                id="updateInput"
                onChange={e => {
                  setNovoValor(e.target.value)
                }}
              />
              <Button
                className="btAtualizar"
                onClick={() => {
                  updateProdut(val.idprodutos)
                }}
              >
                Atualizar valor
              </Button>
            </div>
          )
        })}
      </section>
      </>
  )
}
export default Listagem
