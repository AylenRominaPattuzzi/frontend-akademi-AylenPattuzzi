import React from 'react'
import '../custom/Modal.css'

export default function Modal({
    productName,
    onConfirm,
    onCancel
}) {
    return (
        <div className="modal-overlay">
            <div className="modal">
              <h3>Eliminar Producto</h3>
              <p>¿Estás seguro de que deseas eliminar "{productName}"?</p>
              <div className="modal-actions">
                <button className="cancel-button" onClick={onCancel}>Cancelar</button>
                <button className="confirm-button" onClick={onConfirm}>Confirmar</button>
              </div>
            </div>
          </div>
    )
}

