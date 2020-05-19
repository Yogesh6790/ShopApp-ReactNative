import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCT } from "../action/products";
import Product from "../../models/product";

const initialState = {
    availableProducts : PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
}

const productsReducer = (state = initialState, action) => {
    // console.log(action.products);
    switch (action.type) {
        case SET_PRODUCT:
            return {
                availableProducts: action.products,
                userProducts: action.products.filter(product => product.ownerId === 'u1')
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                availableProducts: state.availableProducts.filter(product => product.id !== action.productId),
                userProducts : state.userProducts.filter(product => product.id !== action.productId),
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(action.productData.id, 'u1', action.productData.title,
            action.productData.image, action.productData.description, action.productData.price);
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }
        case UPDATE_PRODUCT:
            const availableProductIndex = state.availableProducts.findIndex(product => product.id === action.productData.productId);
            const updatedAvailableProducts = { ...state.availableProducts };

            const userProductIndex = state.userProducts.findIndex(product => product.id === action.productData.productId);
            const updatedUserProducts = { ...state.userProducts };

            // console.log(action.productData.productId)
            const updatedProduct = new Product(
                action.productData.productId,
                state.availableProducts[availableProductIndex].ownerId,
                action.productData.title,
                action.productData.image,
                action.productData.description,
                state.availableProducts[availableProductIndex].price
            )
            // console.log(" updatedProduct " + updatedProduct);
            delete state.availableProducts[availableProductIndex];
            delete state.userProducts[userProductIndex];
            // updatedAvailableProducts[availableProductIndex] = updatedProduct;
            
            // console.log("DELETED")
            // console.log("** AVAILABLE **")
            // console.log(state.availableProducts);
            // console.log("** USER **")
            // console.log(state.userProducts);
            // updatedUserProducts[userProductIndex] = updatedProduct;
            // console.log(userProducts);
            // console.log("*** STATE ***");
            // console.log(state);

            return {
                ...state,
                availableProducts: state.availableProducts.concat(updatedProduct).filter(prod => prod !== undefined),
                userProducts: state.userProducts.concat(updatedProduct).filter(prod => prod !== undefined)
            }
        default:
            return {...state}
    }
}

export default productsReducer;