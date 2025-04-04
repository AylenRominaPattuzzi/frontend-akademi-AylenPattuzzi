import React from 'react';
import noImage from '../../img/noImage.png';
import '../styles/CardProduct.css'

export const CardProduct = ({ product, onDelete }) => {
  return (

    <div className="ui card">
      <div className='imageContainer'>
        <div className="ui  image">
          <img src={product.image_url || noImage} alt={product.name} />
        </div>
      </div>
      <div className="content">
        <a className="header">{product.name}</a>
        <div className="meta">
          <span className="date" >Categoría: {product.category} </span>
        </div>
        <div className="description">{product.description}</div>
      </div>
      <div className="extra content">
        <span className="price"> Precio: {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.price)}</span>
        <br />
        <span className="stock">Stock: {product.stock}</span>
      </div>
      <div className="extra content">
        <a className="ui blue basic button" href={`/product/${product.id}`}>
          <i className="eye icon"></i> Detalle
        </a>
        <button className="ui red basic button" onClick={() => onDelete(product)}>
          <i className="trash icon"></i> Eliminar
        </button>
      </div>

    </div>
  )
}

