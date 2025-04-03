import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, updateProduct } from '../../store/actions/index'
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../modals/Modal';
import { Header } from '../common/Header';
import { Button } from '../common/Button'
import { Loader } from '../common/Loader';
import { categories } from '../../utils/categories';
import noImage from '../../img/noImage.png'

const ProductDetail = ({ products, fetchProducts, updateProduct }) => {
  const { id: productId } = useParams();
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const navigate = useNavigate();

  const product = products?.find(p => p.id === productId) || null;

  useEffect(() => {
    if (products?.length === 0) fetchProducts();
  }, [fetchProducts, products?.length]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        category: product.category || '',
        stock: product.stock || '',
        description: product.description || '',
        image_url: product.image_url || ''
      });
    }
  }, [product]);

  const validate = () => {
    if (!formData.name) {
      alert("Ingrese el nombre del producto");
      return false;
    }
    if (!formData.price || formData.price <= 0) {
      alert("Ingrese un precio mayor a cero");
      return false;
    }
    if (!formData.category) {
      alert("Ingrese la categoría del producto");
      return false;
    }
    if (formData.stock < 0) {
      alert("El stock no puede ser negativo");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCancel = () => {
    setFormData({
      name: product.name || '',
      price: product.price || '',
      category: product.category || '',
      stock: product.stock || '',
      description: product.description || '',
      image_url: product.image_url || ''
    });
    setDisabled(true);
    setOpen(false);
  };


  const closeModal = () => {
    setOpen(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validate()) return;
    updateProduct(product.id, formData);
    setDisabled(true);
    setShowMessage(true);
    setTimeout(() => navigate('/'), 2000);
  };

  if (!product) {
    return <Loader />
  }

  return (
    <div className="ui segment">
      {showMessage && (
        <div className="ui positive message">
          <div className="header">
            Producto editado con éxito
          </div>
        </div>
      )}
      <Header
        title='DETALLE DEL PRODUCTO'
      />
      <br/>
      <form className="ui big form">
        <img
          className="ui medium left floated image"
          src={formData.image_url || noImage}
          alt={formData.name}
        />
        <div className="two fields">
          <div className="ui field">
            <label>Nombre del producto</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={disabled} />
          </div>
          <div className="ui field">
            <label>Precio</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} disabled={disabled} />
          </div>
        </div>
        <div className="two fields">
          <div className="ui field">
            <label>Categoría</label>
            <select
              name="category"
              className="ui dropdown"
              value={formData.category}
              onChange={handleChange}
              disabled={disabled}
            >
              <option value="">Seleccione una categoría</option>
              {Object.entries(categories).map(([key, value]) => (
                <option key={key} value={value}>{value[0].toUpperCase() + value.substring(1)}</option>
              ))}
            </select>
          </div>
          <div className="ui field">
            <label>Stock</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} disabled={disabled} />
          </div>
        </div>
        <div className="two fields">
          <div className="ui sixteen wide field">
            <label>Descripción</label>
            <textarea name="description" rows="3" value={formData.description} onChange={handleChange} disabled={disabled}></textarea>
          </div>
        </div>
        <div>
          {disabled ? (
            <Button
              type='button'
              name='Editar'
              onClick={() => setDisabled(!disabled)}
            />
          ) : (
            <Button
              type='button'
              name='Cancelar'
              color='red'
              onClick={() => setOpen(true)}
            />
          )}
          <Button
            type='submit'
            name='Guarda'
            color='green'
            onClick={handleSave} disabled={disabled}
          />

        </div>
      </form>
      {open && (
        <Modal
          onCancel={closeModal}
          onConfirm={handleCancel}
          productName={product.name}
          modalTitle='Cancelar edición'
          modalDescription='¿Estás seguro de que deseas cancelar la edición de '
        />
      )}
    </div>
  );
};

//Mapear el estado global al componente como props
const mapStateToProps = (state) => ({
  products: state.products
});

//Mapear las acciones al componente como props
const mapDispatchToProps = {
  fetchProducts,
  updateProduct
};

//Conectar el componente con Redux
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
