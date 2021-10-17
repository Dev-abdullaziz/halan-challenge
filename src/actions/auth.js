export const login = 'LOGIN'
export const signout = 'SIGN-OUT'

export const loginAction = (token) => {
    return {
        type: login,
        token
    }
}

export const signoutAction = () => {
    return {
        type: signout
    }
}