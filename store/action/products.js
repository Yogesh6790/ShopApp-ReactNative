export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = productId => {
    return {type: DELETE_PRODUCT, productId: productId}
}

export const createProduct = (title, description, image, price) => {
    // const img = Array.isArray(image) ? image[0] : image;
    console.log(title + " " + description + " " + img + " "+price);
    return {
        type: CREATE_PRODUCT,
        productData: {
            title : title,
            description : description,
            image: image,
            price : price
        }
    }
}

export const updateProduct = (productId, title, description, image) => {
    console.log(productId + " " + title + " " + description + " " + image);
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
