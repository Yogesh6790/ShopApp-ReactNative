import React, {useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';
import ProductsNavigator from './products'
import { NavigationActions } from 'react-navigation'

const NavigationContainer = props => {
    const isAuth = useSelector(state => state.auth.token);
    const navRef = useRef();
    console.log('isAuth ' +isAuth);
    useEffect(() => {
        if(!isAuth){
            navRef.current.dispatch(NavigationActions.navigate({ routeName: 'Auth' }));
        }
     }, [isAuth])

    return (
        <ProductsNavigator ref={navRef}/>
    );
}

export default NavigationContainer;