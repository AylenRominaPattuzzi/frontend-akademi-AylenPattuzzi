import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProducList } from './ProducList'
import { ProductDeail } from './ProductDeail'
import { ProductForm } from './ProductForm'


export const App = () => {
  return (
    <div className='ui container' >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProducList />} />
          <Route path='/product/:id' element={<ProductDeail />} />
          <Route path='/add-product' element={<ProductForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
