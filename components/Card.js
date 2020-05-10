import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

const Card = props => {
    return (<View style={{ ...styles.card, ...props.style }}>
        {props.children}
    </View>)

}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.28,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: 'white',
        borderRadius: 10,
    }
})

export default Card;