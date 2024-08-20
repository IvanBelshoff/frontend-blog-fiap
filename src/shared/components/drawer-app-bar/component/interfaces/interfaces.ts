import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

//DrawerAppBar
export interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}