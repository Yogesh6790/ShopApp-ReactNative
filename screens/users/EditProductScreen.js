import React, { useState, useCallback, useEffect, useReducer } from 'react';
import { View, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderBtn from '../../components/HeaderBtn';
import * as productActions from '../../store/action/products';
import Input from '../../components/Input';
import Colors from '../../constants/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
    switch (action.type) {
        case FORM_INPUT_UPDATE:
            const updatedValues = {
                ...state.inputValues,
                [action.input]: action.value
            }
            const updatedValidities = {
                ...state.inputValidities,
                [action.input]: action.isValid
            }
            let updatedFormIsValid = true;
            for (const key in updatedValidities) {
                updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
            }
            // for (const key in updatedValidities) {
            //     console.log(key + " " + updatedValidities[key]);
            // }
            return {
                ...state,
                formIsValid: updatedFormIsValid,
                inputValues: updatedValues,
                inputValidities: updatedValidities

            }
        default:
            return state;
    }
}

const EditProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === productId));

    // console.log("****selectedProduct***")
    // console.log(selectedProduct ? selectedProduct.title: '')
    // console.log(selectedProduct ? selectedProduct.price : '')
    // console.log(selectedProduct ? selectedProduct.imageUrl : '')
    // console.log(selectedProduct ? selectedProduct.description : '')
    // console.log("****selectedProduct***")

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: selectedProduct ? selectedProduct.title : '',
            imageUrl: selectedProduct ? selectedProduct.imageUrl : '',
            price: '',
            description: selectedProduct ? selectedProduct.description : ''
        },
        inputValidities: {
            title: selectedProduct ? true : false,
            imageUrl: selectedProduct ? true : false,
            price: selectedProduct ? true : false,
            description: selectedProduct ? true : false
        },
        formIsValid: selectedProduct ? true : false
    })

    const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong Values Entered', 'Please ensure to input correct values in the fields', [{ text: 'Okay' }]);
            return;
        }
        try {
            setIsLoading(true);
            if (selectedProduct) {
                await dispatch(
                    productActions.updateProduct(
                        productId,
                        formState.inputValues.title,
                        formState.inputValues.description,
                        formState.inputValues.imageUrl))
            } else {
                await dispatch(productActions.createProduct(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    formState.inputValues.price))
            }
            props.navigation.goBack();
        } catch (err) {
            Alert.alert('Something went wrong', 'Some problem occurred', [{ text: 'Okay' }]);
        }
        setIsLoading(false);
        
    }, [dispatch, productId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);


    const validateTextHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])


    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary}/>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='title'
                        label='TITLE'
                        errorText='Please specify correct title'
                        keyboardType='default'
                        returnKeyType='next'
                        autoCapitalize='sentences'
                        onChangeText={validateTextHandler}
                        intialValue={selectedProduct ? selectedProduct.title : ''}
                        intiallyValid={selectedProduct ? true : false} />
                    <Input
                        id='imageUrl'
                        label='IMAGE URL'
                        errorText='Please specify correct image url'
                        keyboardType='default'
                        // returnKeyType='next'
                        onChangeText={validateTextHandler}
                        intialValue={selectedProduct ? selectedProduct.imageUrl : ''}
                        intiallyValid={selectedProduct ? true : false} />
                    {selectedProduct ? null : (<Input
                        id='price'
                        label='PRICE'
                        errorText='Please specify correct price'
                        keyboardType='decimal-pad'
                        // returnKeyType='next'
                        onChangeText={validateTextHandler}
                        intialValue={selectedProduct ? selectedProduct.price : ''}
                        intiallyValid={selectedProduct ? true : false} />)}
                    <Input
                        id='description'
                        label='DESCRIPTION'
                        errorText='Please specify correct description'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        multiline
                        onChangeText={validateTextHandler}
                        intialValue={selectedProduct ? selectedProduct.description : ''}
                        intiallyValid={selectedProduct ? true : false} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default EditProductScreen