import React, { useEffect, useState } from 'react';
import { deleteProduct, fetchProducts } from '../../store/actions/index';
import Modal from '../modals/Modal';
import { connect } from 'react-redux';
import { Header } from '../common/Header';
import { CardProduct } from '../common/CardProduct';
import '../styles/ProductList.css'
import { Message } from '../common/Message';

const ProductList = ({ products, fetchProducts, deleteProduct }) => {
  const [productsPerPage, setProductsPerPage] = useState(9);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [order, setOrder] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
      setPage(0)
    }
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      String(product.stock).includes(search);
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

    return matchesSearch && matchesFilter;
  });

  const orderProducts = () => {
    switch (order) {
      case '1':
        return filteredProducts.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );
      case '2':
        return filteredProducts.sort((a, b) =>
          a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
        );
      case '3':
        return filteredProducts.sort((a, b) => a.price - b.price);
      case '4':
        return filteredProducts.sort((a, b) => b.price - a.price);
      default:
        return filteredProducts;
    }
  };

  const getPages = () => {
    return [...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()];
  };

  const getTableProducts = () => {
    const start = productsPerPage * page;
    const end =
      productsPerPage * (page + 1) > filteredProducts.length
        ? filteredProducts.length
        : productsPerPage * (page + 1);
    return orderProducts().slice(start, end);
  };

  return (
    <div className="ui segment">
      {showMessage && (
        <Message
          message='Producto eliminado con éxito'
          stateMessage='positive'
        />
      )}
      <Header title="LISTADO DE PRODUCTOS" />
      <br />
      <div>
        <div className="ui action input">
          <input
            type="text"
            placeholder="Buscar... "
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <select className="ui compact selection dropdown" onChange={(e) => setFilter(e.target.value)}>
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
          <select className="ui compact selection dropdown" onChange={(e) => setOrder(e.target.value)}>
            <option value="">Ordenar</option>
            <option value="1">Nombre (asc)</option>
            <option value="2">Nombre (desc)</option>
            <option value="3">Precio (menor)</option>
            <option value="4">Precio (mayor)</option>
          </select>
        </div>

        {getTableProducts().length === 0 ? (
          <h2 className="ui center aligned icon grey header">
            <i className="ban grey icon"></i>
            No hay productos disponibles
          </h2>
        ) : (
          <>
            <div className="ui three cards productContainer">
              {getTableProducts().map((product) => (
                <CardProduct key={product.id} product={product} onDelete={handleDeleteClick} />
              ))}
            </div>
            {open && selectedProduct && (
              <Modal
                onCancel={closeModal}
                onConfirm={confirmDelete}
                productName={selectedProduct.name}
                modalTitle="Eliminar producto"
                modalDescription="¿Estás seguro de que deseas eliminar este producto?"
              />
            )}
            <div className="ui pagination menu ">
              {getPages().map((numero) => (
                <a className="active item" onClick={() => setPage(numero)} key={numero}>
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
  products: state.products || [],
});

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  deleteProduct: (id) => dispatch(deleteProduct(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
