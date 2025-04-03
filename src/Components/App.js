import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductList from '../Components/pages/ProductList'
import ProductDetail from './pages/ProductDetail';
import ProductForm from './pages/ProductForm'
import { Nadvar } from './common/Nadvar';
import { Footer } from './common/Footer';

export const App = () => {
  return (
    <div className='ui container' >
      <Nadvar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/add-product' element={<ProductForm />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}
