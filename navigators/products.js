import React from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Colors from '../constants/Colors';
import ProductsOverViewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';

const navigator = createStackNavigator({
    productsOverView: ProductsOverViewScreen,
    productDetails: ProductDetailsScreen,
    cart: CartScreen
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: ''
        },
        headerTintColor: Colors.primary
    }
})

export default createAppContainer(navigator);
