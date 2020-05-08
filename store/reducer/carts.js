import { ADD_TO_CART } from "../action/carts";
import CartItem from "../../models/cart-item";

const initialState = {
    items: {},
    totalAmount: 0
}

const cartsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const selectedProduct = action.product;
            let updatedOrNewProduct = null;
            if (state.items[selectedProduct.id]) {
                updatedOrNewProduct = new CartItem(state.items[selectedProduct.id].quantity + 1,
                    selectedProduct.title,
                    selectedProduct.price,
                    state.items[selectedProduct.id].sum + selectedProduct.price);

            } else {
                updatedOrNewProduct = new CartItem(1, selectedProduct.title, selectedProduct.price, selectedProduct.price);
            }
            return {
                ...state,
                items: { ...state.items, [selectedProduct.id]: updatedOrNewProduct },
                totalAmount: state.totalAmount + selectedProduct.price
            }

        default:
            return { ...state };
    }
}

export default cartsReducer;