import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors';

const CartItem = props => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.title}>{props.title} : </Text>
                <Text style={styles.number}>{props.quantity}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.number}>${props.amount.toFixed(2)}</Text>
                {props.deletable && (<TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons name='ios-trash' size={23} color={Colors.warning} />
                </TouchableOpacity>)}
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        alignItems: 'center',
        margin: 5
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 16
    },
    number: {
        fontSize: 16,
        color: '#888',
        fontWeight: 'bold'
    },
    deleteButton: {
        marginLeft: 20
    }

});

export default CartItem;