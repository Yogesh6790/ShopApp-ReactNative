import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'
import { useSelector } from 'react-redux'
import Colors from '../../constants/Colors';

const CartScreen = props => {
    const totalAmount = useSelector(state => state.carts.totalAmount);
    const items = useSelector(state => state.carts.items);
    const cartItems = [];
    for(const key in items){
        cartItems.push({
            productId: key,
            productTitle: items[key].productTitle,
            productPrice: items[key].productPrice,
            sum: items[key].sum,
            quantity: items[key].quntity
        });
    }
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>TOTAL : <Text style={styles.amount}>${totalAmount}</Text></Text>
                <Button title='Order Now' color={Colors.accent} onPress={() => {
                    console.log("Order Now Pressed"); }} disabled={cartItems.length === 0} />
            </View>
            <View>
                <Text>CART ITEMS</Text>
            </View>
            
        </View>
    )

}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: 'black',
        shadowOpacity: 0.28,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: 'white',
        borderRadius: 10,
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