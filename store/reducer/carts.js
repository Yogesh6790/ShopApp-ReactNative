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
                console.log(parseFloat(state.items[selectedProduct.id].sum) + parseFloat(selectedProduct.price));
                updatedOrNewProduct = new CartItem(state.items[selectedProduct.id].quantity + 1,
                    selectedProduct.title,
                    selectedProduct.price,
                    parseFloat(state.items[selectedProduct.id].sum) + parseFloat(selectedProduct.price));

            } else {
                updatedOrNewProduct = new CartItem(1, selectedProduct.title,
                    parseFloat(selectedProduct.price),
                    parseFloat(selectedProduct.price));
            }
            console.log('state.totalAmount' + state.totalAmount);
            console.log('selectedProduct.price' + selectedProduct.price);
            return {
                ...state,
                items: { ...state.items, [selectedProduct.id]: updatedOrNewProduct },
                totalAmount: parseFloat(state.totalAmount) + parseFloat(selectedProduct.price)
            }

        case REMOVE_FROM_CART:
            const currentProduct = {...state.items[action.productId]};
            let updatedCartItems = {...state.items};
            if(currentProduct.quantity > 1){
                updatedCartItems = {...state.items, [action.productId] : new CartItem(
                    currentProduct.quantity - 1,
                    currentProduct.productTitle,
                    currentProduct.productPrice,
                    parseFloat(currentProduct.sum) - parseFloat(currentProduct.productPrice)
                )}
            }else{
                delete updatedCartItems[action.productId];
            }
            // console.log("updatedCartItems ===> "+updatedCartItems);
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: parseFloat(state.totalAmount) - parseFloat(currentProduct.productPrice)
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
                totalAmount: parseFloat(state.totalAmount) - parseFloat(amountOfProduct)
            }

        default:
            return { ...state };
    }
}

export default cartsReducer;