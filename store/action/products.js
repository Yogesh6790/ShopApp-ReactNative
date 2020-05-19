import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';

export const fetchProducts = () => {
    try {
        return async dispatch => {
            //any async code could be execute before we could dispatch the action
            // console.log('Trigerring api');
            const response = await fetch('https://shopapp-db-277705.firebaseio.com/products.json')
            if (!response.ok) {
                throw new Error('Some error occurred!')
            }
            const resData = await response.json();
            // console.log(resData);

            const loadedProducts = [];
            for (const key in resData) {
                loadedProducts.push(
                    new Product(
                        key,
                        'u1',
                        resData[key].title,
                        resData[key].image,
                        resData[key].description,
                        resData[key].price))
            }

            dispatch({
                type: SET_PRODUCT, products: loadedProducts
            })
        }
    } catch (err) {
        throw err;
    }
}

export const deleteProduct = productId => {
    try {
        return async dispatch => {
            const response = await fetch(`https://shopapp-db-277705.firebaseio.com/products/${productId}.json`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Some error occurred!')
            }
            dispatch({ type: DELETE_PRODUCT, productId: productId });
        }
    } catch (err) {
        throw err;
    }
}

export const createProduct = (title, description, image, price) => {
    try {
        return async dispatch => {
            //any async code could be execute before we could dispatch the action
            const response = await fetch('https://shopapp-db-277705.firebaseio.com/products.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    image,
                    price
                })
            });
            if (!response.ok) {
                throw new Error('Some error occurred!')
            }

            const resData = await response.json();

            dispatch({
                type: CREATE_PRODUCT,
                productData: {
                    id: resData.name,
                    title: title,
                    description: description,
                    image: image,
                    price: price
                }
            })
        }
    } catch (err) {
        throw err;
    }
}

export const updateProduct = (productId, title, description, image) => {
    return async dispatch => {
        try {
            const response = await fetch(`https://shopapp-db-277705.firebaseio.com/products/${productId}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    image
                })
            });
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            dispatch({
                type: UPDATE_PRODUCT,
                productData: {
                    productId: productId,
                    title: title,
                    description: description,
                    image: image
                }
            });
        } catch (err) {
            throw err;
        }
    }
}
