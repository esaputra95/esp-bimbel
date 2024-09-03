export interface LoginInterface {
    username: string,
    password: string
}

export interface ForgotPasswordInterface {
    email: string
}
export interface ChangePasswordInterface {
    password: string,
    newPassword: string,
    confirmNewPassword: string,
}