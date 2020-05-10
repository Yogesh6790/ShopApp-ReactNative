import React from 'react';
import { Button, FlatList } from 'react-native';
import {useSelector, useDispatch} from 'react-redux'
import ProductItem from '../../components/ProductItem';
import * as cartActions from '../../store/action/carts';
import { HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderBtn from '../../components/HeaderBtn';
import Colors from '../../constants/Colors';

const selectItemHandler = (id, title, props) => {
    props.navigation.navigate('productDetails',{
        productId: id,
        productTitle: title})
}

const ProductsOverViewScreen = props => {
    const availableProducts = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();
    return <FlatList data={availableProducts} 
    keyExtractor={item => item.id}
        renderItem={(itemData) => (
            <ProductItem image={itemData.item.imageUrl} 
                        title={itemData.item.title} 
                        price={itemData.item.price} 
                        onSelect={() => {selectItemHandler(itemData.item.id, itemData.item.title, props)}}>
                            <Button color={Colors.primary} title="View Details" onPress={() => selectItemHandler(itemData.item.id, itemData.item.title, props)} />
                            <Button color={Colors.primary} title="Add to Cart" onPress={() => dispatch(cartActions.addToCart(itemData.item))} />
            </ProductItem>) }/>
};

ProductsOverViewScreen.navigationOptions = navData => {
    return{
        headerTitle: 'All Products',
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderBtn}>
            <Item title='menu' iconName='ios-menu' onPress={()=>navData.navigation.toggleDrawer()} />
        </HeaderButtons>),
        headerRight: 
            () => (<HeaderButtons HeaderButtonComponent={HeaderBtn}>
                <Item title='cart' iconName='ios-cart' onPress={()=>navData.navigation.navigate('cart')} />
            </HeaderButtons>)
            
    };

}

export default ProductsOverViewScreen;