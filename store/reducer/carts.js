import { ADD_TO_CART, REMOVE_FROM_CART } from "../action/carts";
import { ADD_ORDER } from "../action/orders";
import CartItem from "../../models/cart-item";
import { DELETE_PRODUCT } from "../action/products";

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

        case REMOVE_FROM_CART:
            const currentProduct = {...state.items[action.productId]};
            let updatedCartItems = {...state.items};
            if(currentProduct.quantity > 1){
                updatedCartItems = {...state.items, [action.productId] : new CartItem(
                    currentProduct.quantity - 1,
                    currentProduct.productTitle,
                    currentProduct.productPrice,
                    currentProduct.sum - currentProduct.productPrice
                )}
            }else{
                delete updatedCartItems[action.productId];
            }
            console.log("updatedCartItems ===> "+updatedCartItems);
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - currentProduct.productPrice
            }
        case ADD_ORDER:
            return initialState;
        case DELETE_PRODUCT:
            if (!state.items[action.productId]) {
                return { ...state };
            }
            const cartItems = { ...state.items };
            const amountOfProduct = cartItems[action.productId].sum;
            delete cartItems[action.productId];
            return {
                ...state,
                items: cartItems,
                totalAmount: state.totalAmount - amountOfProduct
            }

        default:
            return { ...state };
    }
}

export default cartsReducer;