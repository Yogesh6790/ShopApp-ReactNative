
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
            }).catch(err => console.log(err));
            console.log(response.error)
            if (!response.ok) {
                throw new Error("Something went wrong!");
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
                throw new Error("Something went wrong!");
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