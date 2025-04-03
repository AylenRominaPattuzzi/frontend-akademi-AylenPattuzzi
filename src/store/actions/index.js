import products from "../../api/products";
import { GET_PRODUCTS, ADD_PRODUCTS, DELETE_PRODUCTS, UPDATE_PRODUCT } from "../../store/types/actionsType";

export const fetchProducts = () => async dispatch => {
    const response = await products.get('/products');
    dispatch({ type: GET_PRODUCTS, payload: response.data })
}

export const addProduct = (formData) => async dispatch => {
    const response = await products.post('/products', formData);
    dispatch({ type: ADD_PRODUCTS, payload: response.data });
};

export const deleteProduct = (id) => async dispatch => {
    const response = await products.delete(`/products/${id}`);
    dispatch({ type: DELETE_PRODUCTS, payload: id });
};

export const updateProduct = (id, formData) => async dispatch => {
    const response = await products.put(`/products/${id}`, formData);
    dispatch({ type: UPDATE_PRODUCT, payload: response.data });
};
