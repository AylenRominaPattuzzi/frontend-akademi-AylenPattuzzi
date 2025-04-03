import React from 'react';

export const Nadvar = () => {
    return (
        <>
            <div className="ui container">
                <div className="ui secondary pointing menu">
                    <a
                        className={`item ${window.location.pathname === '/' ? 'active' : ''}`}
                        href="/"
                    >
                        Página Principal
                    </a>
                    <a
                        className={`item ${window.location.pathname === '/add-product' ? 'active' : ''}`}
                        href="/add-product"
                    >
                        Agregar Producto
                    </a>
                </div>
            </div>
        </>
    );
};
