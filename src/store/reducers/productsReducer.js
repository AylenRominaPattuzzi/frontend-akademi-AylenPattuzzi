const inicialState = { products: [] };

const productsReducer = (state = inicialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'ADD_PRODUCTS':
            return { ...state, products: [...state.products, action.payload] };
        case 'DELETE_PRODUCTS':
            return { ...state, products: state.products.filter(p => p.id !== action.payload) };
        case 'UPDATE_PRODUCT':
            return { ...state, products: state.products.map(p => p.id === action.payload.id ? action.payload : p) };
        default:
            return state;
    }
};

export default productsReducer;
