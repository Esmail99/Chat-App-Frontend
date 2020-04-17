import { 
    CHANGE_MESSAGE_INPUT,
    CHANGE_USER_NAME,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_CONFIRMATION,
    CHANGE_SIGNIN_STATE,
    USER_NAME_ERROR,
    PASSWORD_ERROR,
    PASSWORD_CONFIRMATION_ERROR
} from './constants'

const initialStateMessage = {
    messageField: ''
}

export const messageInput = (state = initialStateMessage, action = {}) =>{
    switch(action.type){
        case CHANGE_MESSAGE_INPUT:
            return Object.assign({}, state, { messageField: action.payload});
        default:
            return state;
    }
}


const initialStateUserInfo = {
    username: '',
    password: '',
    passwordConfirmation: '',
    isSignedin: false
}

export const userInfo = (state = initialStateUserInfo, action = {}) =>{
    switch(action.type){
        case CHANGE_USER_NAME:
            return Object.assign({}, state, { username: action.payload});
        case CHANGE_PASSWORD:
            return Object.assign({}, state, { password: action.payload});
        case CHANGE_PASSWORD_CONFIRMATION:
            return Object.assign({}, state, { passwordConfirmation: action.payload});
        case CHANGE_SIGNIN_STATE:
            return Object.assign({}, state, { isSignedin: true});
        default:
            return state;
    }
}


const initialStateErrors = {
    usernameErr: '',
    passwordErr: '',
    passwordConfirmationErr: ''
}

export const errors = (state = initialStateErrors, action = {}) =>{
    switch(action.type){
        case USER_NAME_ERROR:
            return Object.assign({}, state, { usernameErr: action.payload});
        case PASSWORD_ERROR:
            return Object.assign({}, state, { passwordErr: action.payload});
        case PASSWORD_CONFIRMATION_ERROR:
            return Object.assign({}, state, { passwordConfirmationErr: action.payload});
        default:
            return state;
    }
}