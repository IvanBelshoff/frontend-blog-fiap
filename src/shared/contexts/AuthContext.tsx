import React, { createContext, useContext, useState } from 'react';

import { AuthContextProps, IAuthContextProps } from '../interfaces';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useDrawer deve ser usado dentro de um DrawerProvider');
    }
    return context;
};

export const AuthProvider: React.FC<IAuthContextProps> = ({ children }) => {

    const [isAuthenticated, setAuthenticated] = useState<boolean>(Boolean(JSON.parse(localStorage.getItem('token') || '""')));

    const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'));

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};
