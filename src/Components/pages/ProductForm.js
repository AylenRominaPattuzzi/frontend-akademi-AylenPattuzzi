import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../../store/actions/index';
import { useNavigate } from 'react-router-dom';
import { Header } from '../common/Header';
import { Button } from '../common/Button';
import { categories } from '../../utils/categories';
import { Message } from '../common/Message';
import { Field } from '../common/Field';

const ProductForm = ({ addProduct }) => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState(null);

  const validate = () => {
    if (!name.length > 0) {
      alert("Ingrese el nombre del producto");
      return false;
    }
    if (!(price > 0)) {
      alert("Ingrese un precio mayor a cero");
      return false;
    }
    if (!category.length > 0) {
      alert("Ingrese la categoría del producto");
      return false;
    }
    if (!(stock >= 0)) {
      alert("El stock no puede ser negativo");
      return false;
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = {
      name,
      category,
      price: Number(price),
      stock: Number(stock),
      description,
      image_url: imageURL,
    };

    addProduct(formData);
    setShowMessage(true);
    setTimeout(() => navigate('/'), 2000);
  };

  const handleImageChange = (e) => {
    const file = e.target.value;
    setImageURL(file);
  };

  return (
    <div className='ui segment'>
      <Header title='AGREGAR PRODUCTO' />
      {showMessage && (
        <Message
          message='Producto creado con éxito'
          stateMessage='positive'
        />
      )}
      <br />
      <form className="ui large form" onSubmit={onSubmit}>
        <div className="two fields">
          <Field
            label='Nombre del producto'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingrese el nombre del producto"
          />
          <Field
            label='Precio'
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ingrese el precio del producto"
          />
        </div>
        <Field
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          isTextArea={true}
          rows={2}
          placeholder="Ingrese una descripción del producto"
        />
        <div className="two fields">
          <div className="field">
            <label>Categoría</label>
            <select
              name="category"
              className="ui dropdown"
              value={category}
              onChange={e => setCategory(e.target.value)}
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
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Ingrese el stock del producto"
          />
        </div>
        <div className="ui placeholder segment">
          <div className="ui icon header">
            <i className="camera retro icon"></i>
            Seleccione una imagen del producto
          </div>
          <input
            className="ui field"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <Button
          name='Enviar'
          type="submit"
        />
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  addProduct,
};

export default connect(null, mapDispatchToProps)(ProductForm);
