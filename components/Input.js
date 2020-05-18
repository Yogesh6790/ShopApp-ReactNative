import React, { useReducer, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native'

const INPUT_VALIDATE = 'INPUT_VALIDATE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_VALIDATE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            }
        default:
            return state;
    }
}
const Input = props => {


    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.intialValue ? props.intialValue : '',
        isValid: props.intiallyValid,
        touched: false
    })

    const { onChangeText, id } = props;

    useEffect(() => {
        // if (inputState.touched) {
        onChangeText(id, inputState.value, inputState.isValid);
        // }
    }, [inputState, onChangeText])


    const inputChangeHandler = text => {
        let isValid = true;
        if (text.trim().length === 0) {
            isValid = false;
        }
        dispatch({
            type: INPUT_VALIDATE,
            value: text,
            isValid: isValid
        })
    }
    const blurHandler = () => {
        dispatch({
            type: INPUT_BLUR
        })
    }
    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                style={styles.input}
                value={inputState.value}
                onChangeText={inputChangeHandler}
                onBlur={blurHandler}
            />
            {!inputState.isValid && inputState.touched
                && <View style={styles.warningContainer}>
                    <Text style={styles.warningTitle}>{props.errorText}</Text>
                </View>}
        </View>
    );
}

const styles = StyleSheet.create({

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
    },
    warningContainer: {
        marginVertical: 5
    },
    warningTitle: {
        color: 'red',
        fontSize: 13
    }
})

export default Input;