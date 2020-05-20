
export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';

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
            console.log(resData);
    
            dispatch({
                type: SIGN_UP
            })
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
            console.log(resData);
    
            dispatch({
                type: LOG_IN
            })
        }
    } catch(err) {
        throw err;
    }
    
}