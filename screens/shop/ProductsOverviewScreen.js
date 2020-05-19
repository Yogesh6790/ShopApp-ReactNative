import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/ProductItem';
import * as cartActions from '../../store/action/carts';
import * as productActions from '../../store/action/products';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderBtn from '../../components/HeaderBtn';
import Colors from '../../constants/Colors';

const selectItemHandler = (id, title, props) => {
    props.navigation.navigate('productDetails', {
        productId: id,
        productTitle: title
    })
}

const ProductsOverViewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const availableProducts = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(productActions.fetchProducts());
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false);
    }, [dispatch]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>Error Occured</Text>
                <Button color={Colors.primary} title="Try Again" onPress={loadProducts} />
            </View>
        )
    }

    console.log(availableProducts);
    console.log(isLoading);
    if (!isLoading && (!availableProducts || availableProducts.length === 0)) {
        return (<View style={styles.centered}>
            <Text>No Products available! Try adding some!</Text>
        </View>);
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    return <FlatList data={availableProducts}
        keyExtractor={item => item.id}
        renderItem={(itemData) => (
            <ProductItem image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => { selectItemHandler(itemData.item.id, itemData.item.title, props) }}>
                <Button color={Colors.primary} title="View Details" onPress={() => selectItemHandler(itemData.item.id, itemData.item.title, props)} />
                <Button color={Colors.primary} title="Add to Cart" onPress={() => dispatch(cartActions.addToCart(itemData.item))} />
            </ProductItem>)} />
};

ProductsOverViewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderBtn}>
            <Item title='menu' iconName='ios-menu' onPress={() => navData.navigation.toggleDrawer()} />
        </HeaderButtons>),
        headerRight:
            () => (<HeaderButtons HeaderButtonComponent={HeaderBtn}>
                <Item title='cart' iconName='ios-cart' onPress={() => navData.navigation.navigate('cart')} />
            </HeaderButtons>)

    };

}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProductsOverViewScreen;