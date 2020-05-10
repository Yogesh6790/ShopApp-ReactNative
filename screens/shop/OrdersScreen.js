import React from 'react'
import { Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderBtn from '../../components/HeaderBtn';
import OrderItem from '../../components/OrderItem';

const OrdersScreen  = props => {
    const orders = useSelector(state => state.orders.orders);
    return (
        <FlatList data={orders} keyExtractor={order => order.id} 
        renderItem={itemData => 
        <OrderItem amount={itemData.item.amount} date={itemData.item.readableDate} 
        items={itemData.item.items}/>} />
    );
}

OrdersScreen.navigationOptions = navData => {
    return{
        headerTitle: "Your Orders",
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderBtn}>
            <Item title='menu' iconName='ios-menu' onPress={()=>navData.navigation.toggleDrawer()} />
        </HeaderButtons>)
    }
}

const styles = StyleSheet.create({

});

export default OrdersScreen;