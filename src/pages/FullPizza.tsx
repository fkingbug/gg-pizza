import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const FullPizza: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pizza, setPizza] = useState<{
    imageUrl: string
    title: string
    price: number
  }>()
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://613e3b5094dbd600172abb2c.mockapi.io/pizzas/' + id)
        setPizza(data)
      } catch (error) {
        alert('ppppp')
        navigate('/')
      }
    }
    fetchPizza()
  }, [])

  if (!pizza) {
    return <>Загрузка...</>
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  )
}

export default FullPizza