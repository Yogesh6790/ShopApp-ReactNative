import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Button, Alert, SafeAreaView, StyleSheet, AsyncStorage } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer';
import Colors from '../constants/Colors';
import * as authActions from '../store/action/auth'


const LogOut = props => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        Alert.alert('Confirm', 'Are you sure you want to logout?',
            [{ text: 'Okay', onPress: confirmLogoutHandler },
            { text: 'Cancel', onPress: cancelHandler }
            ]);
    }

    const confirmLogoutHandler = () => {
        dispatch(authActions.logOut());
        // props.navigation.navigate('Auth');
        return;
    }

    const cancelHandler = () => {
        return;
    }
    return (
        <View style={styles.centered}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                <DrawerItems {...props} />
                <View style={styles.buttonContainer}>
                    <Button title='Logout' color={Colors.primary} onPress={logoutHandler} />
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        paddingTop: 30
    },
    buttonContainer: {
        borderWidth: 1,
        borderColor: 'grey'
    }
})

export default LogOut;