import React from 'react';
import { View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const ProductItem = props => {
    return (
        <TouchableOpacity onPress={props.onViewDetails}>
            <View style={styles.product}>
                <View style={styles.imageContainer}>
                    <Image style={styles.imageStyle} source={{ uri: props.image }} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button color={Colors.primary} title="View Details" onPress={props.onViewDetails} />
                    <Button color={Colors.primary} title="Add to Cart" onPress={props.onAddToCart} />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.28,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: 'white',
        borderRadius: 10,
        height: 300,
        margin: 20
    },
    imageContainer: {
        width: '100%',
        height: '70%',
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    imageStyle: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 14,
        marginVertical: 2
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    details: {
        height: '15%',
        alignItems: 'center',
        padding: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '15%'
    }
});

export default ProductItem;