import products from "../api/products";

export const fetchProduct = () => async dispatch => {
    await dispatch(fetchProducts());
}

export const fetchProducts = () => async dispatch => {
    const response = await products.get('/products');
    dispatch({ type: 'FETCH_PRODUCTS', payload: response.data})
}