import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';
import Colors from '../constants/Colors';
import * as  authActions from  '../store/action/auth'

const StartUpScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const userData = await AsyncStorage.getItem('userData');
            // console.log(userData);
            if (!userData) {
                props.navigation.navigate('Auth');
                return;
            }
            const userDataJson = JSON.parse(userData);
            const userId = userDataJson.userId;
            const token = userDataJson.token;
            const expirationDate = new Date(userDataJson.expirationDate);

            console.log("token = " + token+'\n');
            console.log("userId = " + userId);
            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth');
                return;
            }
            const remainingTime = expirationDate.getTime() - new Date().getTime();

            props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(userId, token, remainingTime));
        }
        fetchData();
    })


    return (
        <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default StartUpScreen;