import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import Colors from '../constants/Colors';
import ProductsOverViewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import UserProductsScreen from '../screens/users/UserProductScreen';
import EditProductScreen from '../screens/users/EditProductScreen';
import AuthScreen from '../screens/users/AuthScreen';
import StartUpScreen from '../screens/StartUpScreen';
import LogOutScreen  from '../components/Logout';
import LogOut from '../components/Logout';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: ''
    },
    headerTintColor: Colors.primary
};

const productsNavigator = createStackNavigator(
    {
        productsOverView: ProductsOverViewScreen,
        productDetails: ProductDetailsScreen,
        cart: CartScreen
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => <Ionicons name='ios-cart' size={23} color={drawerConfig.tintColor} />
        },
        defaultNavigationOptions: defaultNavOptions
    });

const ordersNavigator = createStackNavigator(
    {
        orders: OrdersScreen
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => <Ionicons name='ios-list' size={23} color={drawerConfig.tintColor} />
        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const adminNavigator = createStackNavigator(
    {
        userProducts: UserProductsScreen,
        editProducts: EditProductScreen
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => <Ionicons name='ios-create' size={23} color={drawerConfig.tintColor} />
        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const drawerNavigator = createDrawerNavigator(
    {
        Products: productsNavigator,
        Orders: ordersNavigator,
        UserProducts: adminNavigator,
    }, {
        contentOptions: {
            activeTintColor: Colors.accent
        },
        contentComponent: LogOut,
        drawerOpenRoute: 'LeftSideMenu',
        drawerCloseRoute: 'LeftSideMenuClose',
        drawerToggleRoute: 'LeftSideMenuToggle'
    }
);

const AuthNavigator = createStackNavigator(
    {
        Auth: AuthScreen
    },
    {
        defaultNavigationOptions: defaultNavOptions
    }
);

const MainNavigator = createSwitchNavigator({
    StartUp: StartUpScreen,
    Auth: AuthNavigator,
    Shop: drawerNavigator
})

export default createAppContainer(MainNavigator);
