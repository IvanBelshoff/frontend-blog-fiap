import { ReactNode } from 'react';

//AccountUser
export interface IAccountUserProps {
    profile: ReactNode,
    about: ReactNode,
    logout: ReactNode,
}


export interface ILoaderAccountUser{
    response?: {
        data: {
            errors: {
                default?: string
            }
        }
    }
}