import products from "../api/products";

export const fetchProduct = () => async dispatch => {
    await dispatch(fetchProducts());
}

export const fetchProducts = () => async dispatch => {
    const response = await products.get('/products');
    dispatch({ type: 'FETCH_PRODUCTS', payload: response.data })
}

export const addProduct = (formData) => async dispatch => {
    try {
        const response = await products.post('/products', formData);
        dispatch({ type: 'ADD_PRODUCTS', payload: response.data });
    } catch (error) {
        console.error('Error al agregar el producto:', error);
    }
};

export const deleteProduct = (id) => async dispatch => {
    const response = await products.delete(`/products/${id}`);
    dispatch({ type: 'DELETE_PRODUCTS', payload: id });
};

