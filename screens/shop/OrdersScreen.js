import React, { useState, useEffect} from 'react'
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderBtn from '../../components/HeaderBtn';
import OrderItem from '../../components/OrderItem';
import * as orderActions from '../../store/action/orders'
import Colors from '../../constants/Colors';

const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders);
    
    const loadOrders = async () => {
        setIsLoading(true);
        await dispatch(orderActions.setOrder());
        setIsLoading(false);
    }

    useEffect(() => {
        loadOrders();
    }, dispatch)

    

    console.log('Screen');
    console.log(orders);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default OrdersScreen;