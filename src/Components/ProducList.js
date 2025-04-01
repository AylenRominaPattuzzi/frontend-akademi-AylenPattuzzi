import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from '../actions/index'

export const ProducList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch])

  //Mejorar  los filtros
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || String(product.stock).includes(search);
    const matchesFilter =
      !filter ||
      (filter === '1' && product.category.toLowerCase() === 'laptop') ||
      (filter === '2' && product.category.toLowerCase() === 'celular') ||
      (filter === '3' && product.category.toLowerCase() === 'auriculares') ||
      (filter === '4' && product.category.toLowerCase() === 'teclado') ||
      (filter === '5' && product.category.toLowerCase() === 'mouse') ||
      (filter === '6' && product.category.toLowerCase() === 'smartwatch') ||
      (filter === '7' && product.category.toLowerCase() === 'tablet') ||
      (filter === '8' && product.category.toLowerCase() === 'consola') ||
      (filter === '9' && product.category.toLowerCase() === 'cámara');

    return matchesSearch && matchesFilter;
  });

  return (
    <div >
      <br />
      <h1 className='ui center aligned header' style={{backgroundColor: '#d8bdf0', color: 'white'}}>LISTADO DE PRODUCTOS</h1>
      <div >
        <div className="ui action input">
          <input
            type="text"
            placeholder="Buscar... "
            onChange={e => setSearch(e.target.value)}
            value={search}
          />
          <select
            className="ui compact selection dropdown"
            onChange={e => setFilter(e.target.value)}
          >
            <option value="">Filtrar</option>
            <option value="1">Laptop</option>
            <option value="2">Celular</option>
            <option value="3">Monitor</option>
            <option value="4">Teclado</option>
            <option value="5">Mouse</option>
            <option value="6">Smartwatch</option>
            <option value="7">Tablet</option>
            <option value="8">Consola</option>
            <option value="9">Cámara</option>
          </select>
        </div>

        <table className="ui celled table">
          <thead>
            <tr>
              <th>PRODUCTO</th>
              <th>CATEGORIA</th>
              <th>PRECIO</th>
              <th>STOCK</th>
              <th>DESCRIPCIÓN</th>
              <th>IMAGEN</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>{product.description}</td>
                <td>
                  <img src={product.image_url} width='50' alt="" /></td>
                <td>
                  <a className='ui green basic icon button' href="/add-product">
                    <i className="plus icon" />
                  </a>
                  <a className='ui blue basic icon button' href="/product/:id">
                    <i className='eye icon' />
                  </a>
                  <a className='ui grey basic icon button' href="">
                    <i className="pencil alternate icon"></i>
                  </a>
                  <a className='ui red basic icon button' href="">
                    <i className='trash icon' />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="ui pagination menu">
          <a className="active item">
            1
          </a>
          <div className="disabled item">
            ...
          </div>
          <a className="item">
            10
          </a>
          <a className="item">
            11
          </a>
          <a className="item">
            12
          </a>
        </div>
        <p className='ui red tag label'>-------- Hacer la paginación -----------</p>
      </div>
    </div>
  )
}
