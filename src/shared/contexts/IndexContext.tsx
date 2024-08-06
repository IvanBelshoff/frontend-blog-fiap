import React, { createContext, useContext, useState } from 'react';
import { IIndexContextProps, IndexContextProps } from '../interfaces';

const IndexContext = createContext<IndexContextProps | undefined>(undefined);

export const useIndex = () => {

    const context = useContext(IndexContext);

    if (!context) {
        throw new Error('useIndex deve ser usado dentro de um IndexProvider');
    }

    return context;

};

export const IndexProvider: React.FC<IIndexContextProps> = ({ children }) => {

    const [selectedIndex, setSelectedIndex] = useState<number | undefined>();

    return (
        <IndexContext.Provider value={{ selectedIndex, setSelectedIndex }}>
            {children}
        </IndexContext.Provider>
    );
};