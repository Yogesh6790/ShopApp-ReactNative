import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderBtn from '../../components/HeaderBtn';
import * as productActions from '../../store/action/products';


const EditProductScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === productId));
    const [title, setTitle] = useState(selectedProduct ? selectedProduct.title : '')
    const [image, setImage] = useState(selectedProduct ? selectedProduct.imageUrl : '')
    const [price, setPrice] = useState(selectedProduct ? selectedProduct.price : '')
    const [description, setDescription] = useState(selectedProduct ? selectedProduct.description : '');

    const dispatch = useDispatch();
    
    const submitHandler = useCallback(() => {
        if (selectedProduct) {
            dispatch(productActions.updateProduct(productId, title, description, image))
        } else {
            dispatch(productActions.createProduct(title, description, image, price))
        }
        props.navigation.navigate('userProducts');
        
    }, [dispatch, productId, title, description, image, price]);

    useEffect (() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>TITLE</Text>
                    <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>IMAGE</Text>
                    <TextInput style={styles.input} value={image} onChangeText={image => setImage(image)} />
                </View>
                {selectedProduct ? null : (<View style={styles.formControl}>
                    <Text style={styles.label}>PRICE</Text>
                    <TextInput style={styles.input} value={price} onChangeText={price => setPrice(price)} />
                </View>)}
                <View style={styles.formControl}>
                    <Text style={styles.label}>DESCRIPTION</Text>
                    <TextInput style={styles.input} value={description} onChangeText={desc => setDescription(desc)} />
                </View>
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = navData => {
    const submitHandler = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('header'),
        headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderBtn}>
            <Item title='Save' iconName='ios-checkmark' onPress={submitHandler} />
        </HeaderButtons>)
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        marginVertical: 8
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    input: {
        paddingLeft: 2,
        paddingVertical: 5,
        borderBottomColor: '#888',
        borderBottomWidth: 1
    }

});

export default EditProductScreen