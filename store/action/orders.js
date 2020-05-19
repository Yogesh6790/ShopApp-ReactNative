import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDER = 'SET_ORDER';

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        const date = new Date();
        const response = await fetch(`https://shopapp-db-277705.firebaseio.com/orders/u1.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: cartItems,
                amount: totalAmount,
                date : date.toISOString()
            })
        });
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        const resData = await response.json();

         dispatch({
            type: ADD_ORDER,
             orderData: {
                id: resData.name,
                items: cartItems,
                amount: totalAmount,
                date: date
            }
        });
    }
}

export const setOrder = () => {
    return async dispatch => {
        const response = await fetch('https://shopapp-db-277705.firebaseio.com/orders/u1.json')
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        const resData = await response.json();
        console.log(resData);

        const loadedOrders = [];
        for (const key in resData) {
            loadedOrders.push(
                new Order(
                    key,
                    resData[key].items,
                    resData[key].amount,
                    resData[key].date))
        }

        console.log('*** loadedOrders ***');
        console.log(loadedOrders);
         dispatch({
            type: SET_ORDER,
            orders: loadedOrders
        });
    }
}