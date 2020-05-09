import { ADD_ORDER } from "../action/orders";

const initialState = {
    orders: []
}

const ordersReducer = (state=initialState, action) => {
    switch(action.type){
        case ADD_ORDER:
            console.log("---- Add Order ----")
            const newOrder = new Order(new Date().toString(),
            action.orderData.items,
            action.orderData.amount,
            new Date());
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
        default:
            return {...state};
    }
}

export default ordersReducer;