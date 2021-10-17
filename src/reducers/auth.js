import { login, signout } from "../actions/auth";

export function authHandler(state = null , action) {
    switch(action.type) {
        case login:
            return action.token
        case signout:
            return null
        default:
            return state
    }

}