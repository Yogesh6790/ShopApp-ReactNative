import { AsyncStorage } from 'react-native'

export const AUTHENTICATE = 'AUTHENTICATE';
export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

let timer;
export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({ type: AUTHENTICATE, userId: userId, token: token })
    }
}

export const signUp = (email, password) => {
    try {
        console.log(email)
        console.log(password)
        return async dispatch => {
            console.log('*** SIGN UP ****');
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEVmK371nC4O4Smv2tDgTWHrztVz4GNEA', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                const errorId = errorData.error.message;
                let errorMessage = "Something went wrong"
                if (errorId === 'EMAIL_EXISTS') {
                    errorMessage = "Email already exists"
                }
                throw new Error(errorMessage);
            }
    
            const resData = await response.json();
    
            dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))
            const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
            saveDataToStorage(resData.localId, resData.idToken, expirationDate)
        }
    } catch(err){
        throw err;
    }
    
}


export const login = (email, password) => {
    try {
        return async dispatch => {
            console.log('*** LOG IN ***');

            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEVmK371nC4O4Smv2tDgTWHrztVz4GNEA', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });
             console.log(response.ok);
            
            if (!response.ok) {
                const errorData = await response.json();
                const errorId = errorData.error.message;
                let errorMessage = "Something went wrong"
                if (errorId === 'EMAIL_NOT_FOUND') {
                    errorMessage = "Email could not be found"
                } else if (errorId === 'INVALID_PASSWORD') {
                    errorMessage = "Password is Invalid"
                }
                throw new Error(errorMessage);
            }
    
            const resData = await response.json();
    
            dispatch(authenticate(resData.localId,resData.idToken, parseInt(resData.expiresIn) * 1000))
            const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
            saveDataToStorage(resData.localId, resData.idToken, expirationDate)
        }
    } catch(err) {
        throw err;
    }
    
}

export const logOut = () => {
    clearLogOutTimer(timer)
    AsyncStorage.removeItem('userData');
    return {
        type : LOG_OUT
    }
}

const clearLogOutTimer = timer => {
    if (timer) {
        clearTimeout(timer);
    }
}

const setLogoutTimer = expirationDate => {
    return async dispatch => {
         timer = await setTimeout(() => {
            dispatch(logOut())
        }, expirationDate)

    }
}

const saveDataToStorage = (userId, token, expirationDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            userId: userId,
            token: token,
            expirationDate : expirationDate.toISOString()
        })
    )
}