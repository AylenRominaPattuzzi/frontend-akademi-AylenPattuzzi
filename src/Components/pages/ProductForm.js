import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../actions';
import { useNavigate } from 'react-router-dom';

export const ProductForm = () => {
  const navigate = useNavigate()
  const [showMessage, setShowMessage] = useState(false)
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState(null);

  const dispatch = useDispatch();

  const validate = () => {
    if (!name.length > 0) {
      alert("Ingrese el nombre del producto")
      return false
    }
    if (!price > 0) {
      alert("Ingrese un precio mayor a cero")
      return false
    }
    if (!category.length > 0) {
      alert("Ingrese la categoria del producto")
      return false
    }
    if (!stock >= 0) {
      alert("El stock no puede ser negativo")
      return false
    }

    return true
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return
    }
    const formData = {
      name,
      category,
      price: Number(price),
      stock: Number(stock),
      description,
      image_url: imageURL,
    };
    dispatch(addProduct(formData));
    setShowMessage(true)
    setTimeout(() => navigate('/'), 2000)
  };

  const handleImageChange = (e) => {
    const file = e.target.value;
    setImageURL(file);
  };


  return (
    <div className='content'>
      {showMessage && (
        <div className="ui positive message">
          <div className="header">
            Producto guardado con exito
          </div>
        </div>
      )}

      <br />
      <form className="ui form" onSubmit={onSubmit}>
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
            <label>Categoria</label>
            <select
              className="ui dropdown"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="">Seleccione una categoría</option>
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
        <button className="ui blue button" type="submit" >
          Enviar
        </button>
      </form>
    </div>
  );
};
