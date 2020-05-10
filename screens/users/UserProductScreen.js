import React, { useEffect } from 'react';
import { FlatList, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderBtn from '../../components/HeaderBtn';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/action/products'

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    userProducts.sort((a, b) => a.id > b.id ? 1 : -1);
    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        const prodTitle = userProducts.find(product => product.id === id).title;
        Alert.alert('Are you Sure?', prodTitle + ' will be deleted permanently', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(productActions.deleteProduct(id))
                }
            }])
    }

    const selectItemHandler = (id) => {
        props.navigation.navigate('editProducts', { header: 'Edit Product', productId: id });
    }
    return <FlatList data={userProducts} keyExtractor={item => item.id} renderItem={itemData => (
        <ProductItem image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => selectItemHandler(itemData.item.id)}>
            <Button color={Colors.primary} title="Edit" onPress={() => selectItemHandler(itemData.item.id)} />
            <Button color={Colors.primary} title="Delete" onPress={deleteHandler.bind(this, itemData.item.id)} />
        </ProductItem>)}
    />
}

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderBtn}>
            <Item title='menu' iconName='ios-menu' onPress={() => navData.navigation.toggleDrawer()} />
        </HeaderButtons>),
        headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderBtn}>
            <Item title='menu' iconName='ios-create' onPress={() => navData.navigation.navigate('editProducts', { header: 'Add Product' })} />
        </HeaderButtons>)
    };

}

export default UserProductsScreen;