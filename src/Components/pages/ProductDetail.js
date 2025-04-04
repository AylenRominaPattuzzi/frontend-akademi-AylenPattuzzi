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
import '../styles/ProductDetail.css'
import { Message } from '../common/Message';
import { Field } from '../common/Field';
import { getInitialFormData } from '../../utils/formHelpers';


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
      setFormData(getInitialFormData(product));
    }
  }, [product]);

  const validate = () => {
    const { name, price, category, stock } = formData;
    if (!name) return alert("Ingrese el nombre del producto"), false;
    if (!(price > 0)) return alert("Ingrese un precio mayor a cero"), false;
    if (!category) return alert("Ingrese la categoría del producto"), false;
    if (stock < 0) return alert("El stock no puede ser negativo"), false;
    return true;
  };

  const handleCancel = () => {
    setFormData(getInitialFormData(product));
    setDisabled(true);
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

  return (
    <div className="ui segment">
      {!product && (
        <Loader />
      )}
      {showMessage && (
        <Message
          message='Producto editado con éxito'
          stateMessage='positive'
        />
      )}
      <Header
        title='DETALLE DEL PRODUCTO'
      />
      <br />
      <form className="ui big form">
        <div className='imageContainer ui medium left floated image'>
          <img
            src={formData.image_url || noImage}
            alt={formData.name}
          />
        </div>
        <div className="two fields">
          <Field
            label='Nombre del producto'
            type='text'
            value={formData.name}
            onChange={handleChange}
            disabled={disabled}
            placeholder="Ingrese el nombre del producto"
            name='name'
          />
          <Field
            label='Precio'
            type='number'
            value={formData.price}
            onChange={handleChange}
            disabled={disabled}
            placeholder="Ingrese el precio del producto"
            name='price'
          />
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
          <Field
            label='Stock'
            type='number'
            value={formData.stock}
            onChange={handleChange}
            disabled={disabled}
            placeholder="Ingrese el stock del producto"
            name='stock'
          />
        </div>

        <div className="two fields">
          <Field
            label="Descripción"
            name="description"
            value={formData.description}
            onChange={handleChange}
            isTextArea={true}
            rows={3}
            disabled={disabled}
            wide='sixteen'
          />
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
            name='Guardar'
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


const mapStateToProps = (state) => ({
  products: state.products
});

const mapDispatchToProps = {
  fetchProducts,
  updateProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
