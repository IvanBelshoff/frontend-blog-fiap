
//loginAction
export interface IActionLogin {
    response: {
        data: {
            errors?: {
                default?: string
                body?: {
                    email: string,
                    senha: string,
                    emailRecuperacao: string
                }
            }
            success?: {
                recover?: {
                    message: string
                }
                login?: {
                    message: string
                }
            }
        }
    }
}

//Login
export interface ILoginAction {
    errors?: {
        default?: string
        body?: {
            email: string,
            senha: string,
            emailRecuperacao: string
        }
    }
    success?: {
        recover?: {
            message: string
        }
        login?: {
            message: string
        }
    }
}
