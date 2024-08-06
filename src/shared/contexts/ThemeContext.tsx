import {
	createContext,
	useCallback,
	useMemo,
	useState,
	useContext
} from 'react';
import {
	Box,
	ThemeProvider
} from '@mui/material';

import {
	DarkTheme,
	LightTheme
} from '../themes';
import {
	IAppThemeProviderProps,
	IThemeContextData
} from '../interfaces';

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
	return useContext(ThemeContext);
};

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {
	const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

	const toggleTheme = useCallback(() => {
		setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
	}, []);

	const theme = useMemo(() => {
		if (themeName === 'light') {
			return LightTheme;
		}

		return DarkTheme;
	}, [themeName]);

	return (
		<ThemeContext.Provider value={{ themeName: themeName, toggleTheme: toggleTheme }}>
			<ThemeProvider theme={theme}>
				<Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
					{children}
				</Box>
			</ThemeProvider>
		</ThemeContext.Provider>
	);
};