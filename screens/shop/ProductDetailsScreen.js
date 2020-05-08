import React from 'react'
import { Text, Image, ScrollView, Button, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as cartActions from '../../store/action/carts'
import Colors from '../../constants/Colors';

const ProductDetailsScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(product => product.id === productId));
    const dispatch = useDispatch();
    // console.log(selectedProduct)
    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <Text style={styles.price}>${selectedProduct.price}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
            <Button style={styles.button} color={Colors.primary} title="Add to Cart"
                onPress={() => dispatch(cartActions.addToCart(selectedProduct))} />
        </ScrollView>
    );
}

ProductDetailsScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontSize: 20,
        marginVertical: 4,
        color: '#888',
        textAlign: 'center'
    },
    description: {
        fontSize: 14,
        marginVertical: 4,
        textAlign: 'center'
    },
    button: {
        alignItems: 'center'
    }

});

export default ProductDetailsScreen;