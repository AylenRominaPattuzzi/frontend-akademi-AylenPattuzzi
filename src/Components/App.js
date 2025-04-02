import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProductList } from './pages/ProductList'
import { ProductDetail } from './pages/ProductDetail'
import { ProductForm } from './pages/ProductForm'

export const App = () => {
  return (
    <div className='ui container' >
      <div className="ui secondary pointing menu">
        <a className="active item" href="/">
          Página Principal
        </a>
        <a className="item" href="/add-product">
          Agregar Producto
        </a>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/add-product' element={<ProductForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
