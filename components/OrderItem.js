import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import CartItem from '../components/CartItem';
import Card from './Card';

const OrderItem = props => {

    const [showDetails, setShowDetails] = useState(false);

    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Colors.primary} title={showDetails ? 'Hide Details' : 'Show Details'} onPress={() => setShowDetails(prevState => !prevState)} />
            {showDetails && (<View>
                <FlatList data={props.items} keyExtractor={item => item.productId} renderItem={itemData => (<CartItem title={itemData.item.productTitle}
                        quantity={itemData.item.quantity} amount={itemData.item.sum}
                        onRemove={() => { dispatch(cartActions.removeFromCart(itemData.item.productId)) }} />)} />
            </View>)}
        </Card>
    );
}

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    totalAmount: {
        fontSize: 16
    },
    date: {
        fontSize: 16,
        color: '#888'
    }

});

export default OrderItem;