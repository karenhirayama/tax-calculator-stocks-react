import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteAllOperations } from '../../Redux/Actions/stocksActions';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC, useState } from 'react';
import { ButtonComponent } from '../ButtonComponent';
import { ConfirmationDelete } from '../ConfirmationsActions/ConfirmationDelete';

export const DeleteOperations: FC<any> = ({ operations }) => {
    const [showConfirmationDelete, setShowConfirmationDelete] = useState(false);

    const dispatch = useDispatch();

    const handleShowConfirmationDelete = () => {
        setShowConfirmationDelete(!showConfirmationDelete);
    };

    const handleDeleteAllOperations = () => {
        dispatch(deleteAllOperations() as any);
        setTimeout(() => {
            handleShowConfirmationDelete();
        }, 300);
    };

    return (
        <Box
            sx={{
                marginY: 4
            }}
        >
            <ButtonComponent
                iconButton={<DeleteIcon />}
                colorButton={'error'}
                handleOnClick={handleShowConfirmationDelete}
                textButton={"Deletar todas as operações"}
                // disabledButton={operations.length > 0 ? false : true}
            />
            <ConfirmationDelete
                showConfirmationDelete={showConfirmationDelete}
                handleShowConfirmationDelete={handleShowConfirmationDelete}
                handleDeleteOperation={handleDeleteAllOperations}
                textModal='Você tem certeza que deseja deletar todas as operações?'
            />
        </Box>
    );
};
