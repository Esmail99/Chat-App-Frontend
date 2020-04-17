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

export const changeMessageInput = (text) => ({
    type: CHANGE_MESSAGE_INPUT,
    payload: text
})

export const changeUsername = (username) => ({
    type: CHANGE_USER_NAME,
    payload: username
})

export const changePassword = (password) => ({
    type: CHANGE_PASSWORD,
    payload: password
})

export const changePasswordConfirmation = (passwordConf) => ({
    type: CHANGE_PASSWORD_CONFIRMATION,
    payload: passwordConf
})

export const changeSigninState = () => ({
    type: CHANGE_SIGNIN_STATE
})

export const validateUsername = (text) => ({
    type: USER_NAME_ERROR,
    payload: text
})

export const validatePassword = (text) => ({
    type: PASSWORD_ERROR,
    payload: text
})

export const validatePasswordConfirmation = (text) => ({
    type: PASSWORD_CONFIRMATION_ERROR,
    payload: text
})