
import { AUTHENTICATE, LOG_OUT } from "../action/auth";

const initialState = {
    token: null,
    useId: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId
            }
        case LOG_OUT:
            return initialState;
        default: {
            return { ...state };
        }
    }
}

export default authReducer;