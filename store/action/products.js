import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'UPDATE_PRODUCT';

export const fetchProducts = () => {
    try {
        return async dispatch => {
            //any async code could be execute before we could dispatch the action
            const response = await fetch('https://shopapp-db-277705.firebaseio.com/products.jon')
            if (!response.ok) {
                throw new Error('Some error occurred!')
            }
            const resData = await response.json();
            console.log(resData);

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
    return { type: DELETE_PRODUCT, productId: productId }
}

export const createProduct = (title, description, image, price) => {
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

        const resData = await response.json();
        console.log(resData);

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
}

export const updateProduct = (productId, title, description, image) => {
    // console.log(productId + " " + title + " " + description + " " + image);
    return {
        type: UPDATE_PRODUCT,
        productData: {
            productId: productId,
            title: title,
            description: description,
            image: image
        }
    }
}
