import React from 'react';
import {FlatList, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux'
import ProductItem from '../../components/ProductItem';
import * as cartActions from '../../store/action/carts';
import { HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderBtn from '../../components/HeaderBtn';

const ProductsOverViewScreen = props => {
    const availableProducts = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();
    return <FlatList data={availableProducts} 
    keyExtractor={item => item.id}
    renderItem={(itemData) =>  <ProductItem image={itemData.item.imageUrl} 
    title={itemData.item.title} 
    price={itemData.item.price} 
    onViewDetails={() => {props.navigation.navigate('productDetails',{
        productId: itemData.item.id,
        productTitle: itemData.item.title
    })}} onAddToCart={() => dispatch(cartActions.addToCart(itemData.item))} /> }/>
};

ProductsOverViewScreen.navigationOptions = navData => {
    return{
        headerTitle: 'All Products',
        headerRight: 
            () => (<HeaderButtons HeaderButtonComponent={HeaderBtn}>
                <Item title='cart' iconName='ios-cart' onPress={()=>navData.navigation.navigate('cart')} />
            </HeaderButtons>)
            
    };

}

export default ProductsOverViewScreen;