import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteAllOperations } from '../../redux/actions/stocksActions';
import DeleteIcon from '@mui/icons-material/Delete';
import { FunctionComponent } from 'react';

export const DeleteOperations: FunctionComponent<any> = ({ operations }) => {
    const dispatch = useDispatch()

    const handleDeleteAllOperations = () => {
        dispatch(deleteAllOperations() as any)
    };
 
    return (
        <Box sx={{
            marginY: 4
        }}>
            <Button variant="outlined" color="error" onClick={(e: any) => handleDeleteAllOperations()}
                disabled={operations.length > 0 ? false : true}
                startIcon={<DeleteIcon />}
            >
                Deletar todas as operações
            </Button>
        </Box>
    );
};
