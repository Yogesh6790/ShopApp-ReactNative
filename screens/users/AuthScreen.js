import React, {useState, useReducer, useCallback} from 'react';
import { useDispatch } from 'react-redux';
import { View, Button, KeyboardAvoidingView, ActivityIndicator, StyleSheet, Alert } from 'react-native'
import Input from '../../components/Input';
import { LinearGradient } from 'expo-linear-gradient'
import Card from '../../components/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/action/auth'


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

const AuthScreen = props => {
    const [isSignUp, setIsSignUp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    })

    const validateTextHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])

    const signUpOrLoginHandler = async () => {
        let actions = null;
        if (isSignUp) {
            actions  = authActions.signUp(formState.inputValues.email, formState.inputValues.password);
        } else {
            actions  = authActions.login(formState.inputValues.email, formState.inputValues.password);
        }
        setIsLoading(true);
        try {
            await dispatch(actions);
            console.log('going to navigate')
            props.navigation.navigate('Shop');
        } catch (err) {
            setIsLoading(false)
            Alert.alert(err.message, '', [{ text: 'Okay' }])
        }
        
    }
    return (<KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={50} style={styles.screen}>
        <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradientContainer}>
            <Card style={styles.cardContainer}>
                <Input
                    id='email'
                    label='E-mail'
                    errorText='Please specify correct email'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    onChangeText={validateTextHandler}
                    intialValue=''
                />
                <Input
                    id='password'
                    label='Password'
                    errorText='Please provide correct password'
                    keyboardType='default'
                    secureTextEntry
                    autoCapitalize='none'
                    onChangeText={validateTextHandler}
                    intialValue=''
                />
                <View style={styles.buttonContainer}>
                    {isLoading ? <ActivityIndicator size='small' color={Colors.primary}/> : <Button
                        title={isSignUp ? 'Sign Up' : 'Login'}
                        color={Colors.primary}
                        onPress={signUpOrLoginHandler} />}
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`}
                        color={Colors.accent}
                        onPress={() => setIsSignUp(!isSignUp)}/>
                </View>

            </Card>
        </LinearGradient>
    </KeyboardAvoidingView>);
}

AuthScreen.navigationOptions = () => {
    return {
        headerTitle: 'Authenticate'
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradientContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContainer: {
        width: '80%',
        maxWidth: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 5
    }
});

export default AuthScreen;