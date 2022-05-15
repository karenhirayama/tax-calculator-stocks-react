import { styled } from '@mui/material/styles';
export const InputContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: '40%',
    [theme.breakpoints.down(1064)]: {
        width: '100%'
    }
}));

export const InputBox = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '40%',
    gap: 24,
    margin: 'auto',
    [theme.breakpoints.down(1064)]: {
        width: '100%'
    }
}));