import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProductList } from './ProductList'
import { ProductDetail } from './ProductDetail'
import { ProductForm } from './ProductForm'

export const App = () => {
  return (
    <div className='ui container' >
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
