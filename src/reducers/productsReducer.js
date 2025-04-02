import products from "../api/products";

const inicialState = { products: [] }

const productsReducer = (state = inicialState, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCTS':
            return { ...state, products: action.payload };
        case 'ADD_PRODUCTS':
            return { ...state, products: [...state.products, action.payload] };
        case 'DELETE_PRODUCTS':
            return { ...state, products: state.products.filter(p => p.id !== action.payload) };
        default:
            return state;

    }
}

export default productsReducer;