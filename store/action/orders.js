export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totalAmount) => {
    return {
        ...state,
        orderData : {
            items: cartItems,
            amount: totalAmount
        }
    }

}