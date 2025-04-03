import React, { useEffect, useState } from 'react';
import { deleteProduct, fetchProducts } from '../../store/actions/index';
import Modal from '../modals/Modal';
import noImage from '../../img/noImage.png'
import { connect } from 'react-redux';
import { Header } from '../common/Header';

const ProductList = ({ products, fetchProducts, deleteProduct }) => {
  const [productsPerPage, setProductsPerPage] = useState(9)
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0)
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [order, setOrder] = useState()

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, products]);


  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct.id);
      setShowMessage(true);
      setOpen(false);
      setSelectedProduct(null);
      setTimeout(() => setShowMessage(false), 2000);
      fetchProducts();
    }
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || String(product.stock).includes(search);
    const matchesFilter =
      !filter ||
      (filter === '1' && product.category.toLowerCase() === 'laptop') ||
      (filter === '2' && product.category.toLowerCase() === 'celular') ||
      (filter === '3' && product.category.toLowerCase() === 'monitor') ||
      (filter === '4' && product.category.toLowerCase() === 'teclado') ||
      (filter === '5' && product.category.toLowerCase() === 'mouse') ||
      (filter === '6' && product.category.toLowerCase() === 'smartwatch') ||
      (filter === '7' && product.category.toLowerCase() === 'tablet') ||
      (filter === '8' && product.category.toLowerCase() === 'consola') ||
      (filter === '9' && product.category.toLowerCase() === 'cámara');

    return matchesSearch && matchesFilter
  });

  const orderProducts = () => {
    switch (order) {
      case "1":
        return filteredProducts.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
      case "2":
        return filteredProducts.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1)
      case "3":
        return filteredProducts.sort((a, b) => a.price - b.price)
      case "4":
        return filteredProducts.sort((a, b) => b.price - a.price)
      default:
        return filteredProducts

    }
  }

  const getPages = () => {
    return [...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()]
  }

  const getTableProducts = () => {
    const start = productsPerPage * page
    const end = productsPerPage * (page + 1) > filteredProducts.length ? filteredProducts.length : productsPerPage * (page + 1)
    return orderProducts().slice(start, end)
  }

  return (
    <div className='ui segment'>
      {showMessage && (
        <div className="ui positive message">
          <div className="header">
            Producto eliminado con exito
          </div>
        </div>
      )}
      <Header
        title='LISTADO DE PRODUCTOS'
      />
      <br />
      <div>
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
          <select
            className="ui compact selection dropdown"
            onChange={e => setOrder(e.target.value)}
          >
            <option value="">Ordenar</option>
            <option value="1">Nombre (asc)</option>
            <option value="2">Nombre (desc)</option>
            <option value="3">Precio (menor)</option>
            <option value="4">Precio (mayor)</option>
          </select>
        </div>

        {getTableProducts().length === 0 ?

          <h2 className="ui center aligned icon grey header">
            <i className="ban grey icon"></i>
            No hay productos disponibles
          </h2> : (
            <>
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
                  {getTableProducts().map(product => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.category[0].toUpperCase() + product.category.substring(1)}</td>
                      <td>${product.price}</td>
                      <td>{product.stock}</td>
                      <td>{product.description}</td>
                      <td><img src={product.image_url || noImage} width='50' alt="" /></td>
                      <td>
                        <a className='ui blue basic icon button' href={`/product/${product.id}`}>
                          <i className='eye icon' />
                        </a>
                        <button className='ui red basic icon button' onClick={() => handleDeleteClick(product)}>
                          <i className='trash icon' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {open && selectedProduct && (
                <Modal
                  onCancel={closeModal}
                  onConfirm={confirmDelete}
                  productName={selectedProduct.name}
                  modalTitle='Eliminar producto'
                  modalDescription='¿Estás seguro de que deseas eliminar'
                />
              )}
              <div className="ui pagination menu">
                {getPages().map((numero) => (
                  <a className="active item" onClick={() => setPage(numero)}>
                    {numero + 1}
                  </a>
                ))}
              </div>
            </>
          )}
      </div>
      <br />
    </div>
  );
};
const mapStateToProps = (state) => ({
  products: state.products || []
});

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  deleteProduct: (id) => dispatch(deleteProduct(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);