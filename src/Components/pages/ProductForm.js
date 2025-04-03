import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../../store/actions/index';
import { useNavigate } from 'react-router-dom';
import { Header } from '../common/Header';
import { Button } from '../common/Button'
import { categories } from '../../utils/categories';

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
    if (!validate()) {
      return;
    }
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
      <Header
        title='AGREGAR PRODUCTO'
      />
      {showMessage && (
        <div className="ui positive message">
          <div className="header">
            Producto guardado con éxito
          </div>
        </div>
      )}

      <br />
      <form className="ui large form" onSubmit={onSubmit}>
        <div className="two fields">
          <div className="field">
            <label>Nombre del producto</label>
            <input
              placeholder="Ingrese el nombre del producto"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="field">
            <label>Precio</label>
            <input
              placeholder="Ingrese el precio del producto"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
        </div>
        <div className="field">
          <label>Descripción</label>
          <textarea
            rows="2"
            placeholder="Ingrese una descripción del producto"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>
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
          <div className="field">
            <label>Stock</label>
            <input
              placeholder="Ingrese el stock del producto"
              type="number"
              onChange={(e) => setStock(e.target.value)}
              value={stock}
            />
          </div>
        </div>
        <div className="ui placeholder segment">
          <div className="ui icon header">
            <i className="camera retro icon"></i>
            Ingrese una imagen del producto
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

// Conectar el componente con Redux
const mapDispatchToProps = {
  addProduct,
};

export default connect(null, mapDispatchToProps)(ProductForm);
