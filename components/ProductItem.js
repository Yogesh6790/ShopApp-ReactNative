import React from 'react';
import { View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Card from './Card';

const ProductItem = props => {
    // console.log("image "+props.image);
    // console.log("title "+props.title);
    return (
        <TouchableOpacity onPress={props.onSelect}>
            <Card style={styles.product}>
                <View style={styles.imageContainer}>
                    <Image style={styles.imageStyle} source={{ uri: props.image.toString() }} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    {props.children}
                </View>
            </Card>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    product: {
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