import React from 'react'
import '../styles/Modal.css'
import { Button } from '../common/Button'


export default function Modal({
  productName,
  onConfirm,
  onCancel,
  modalTitle,
  modalDescription
}) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{modalTitle}</h3>
        <p>{modalDescription} "{productName}"?</p>
        <div className="modal-actions">
          <Button
            name='Cancelar'
            onClick={onCancel}
            type='button'
          />
          <Button
            name='Confirmar'
            onClick={onConfirm}
            type='button'
            color='red'
          />
        </div>
      </div>
    </div>
  )
}

