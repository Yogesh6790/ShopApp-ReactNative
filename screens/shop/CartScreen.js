import React, {useState} from 'react';
import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors';
import CartItem from '../../components/CartItem';
import * as cartActions from  '../../store/action/carts'
import * as orderActions from  '../../store/action/orders'
import Card from '../../components/Card';

const CartScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const totalAmount = useSelector(state => state.carts.totalAmount);
    // console.log(' ** totalAmount **'+totalAmount)
    const items = useSelector(state => state.carts.items);
    const cartItems = [];
    for(const key in items){
        cartItems.push({
            productId: key,
            productTitle: items[key].productTitle,
            productPrice: items[key].productPrice,
            sum: items[key].sum,
            quantity: items[key].quantity
        });
    }
    cartItems.sort((a,b) => a.productId > b.productId ? 1 : -1);
    const dispatch = useDispatch();
    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>TOTAL : <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text></Text>
                {isLoading ? <ActivityIndicator size='small' color={Colors.primary}/> :
                <Button title='Order Now' color={Colors.accent} onPress={async () => {
                    setIsLoading(true);
                    await dispatch(orderActions.addOrder(cartItems, totalAmount))
                    setIsLoading(false)
                }} disabled={cartItems.length === 0} />}
            </Card>
            <View >
                <FlatList data={cartItems} keyExtractor={item => item.productId}
                renderItem={itemData => <CartItem title={itemData.item.productTitle} 
                quantity={itemData.item.quantity} amount={itemData.item.sum} deletable
                onRemove={() => {dispatch(cartActions.removeFromCart(itemData.item.productId))}} />}/>
            </View>
            
        </View>
    )

}


CartScreen.navigationOptions = navData => {
    return{
        headerTitle: "Your Cart"
    }
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 10
    },
    summaryText: {
        fontSize: 18
    },
    amount: {
        color: Colors.primary,
        fontWeight: 'bold'
    }

});

export default CartScreen;