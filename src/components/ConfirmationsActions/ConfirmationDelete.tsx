import { FC } from "react";
import { Modal, Box, Typography } from '@mui/material';
import { styleModal } from "../../Styles";
import { ButtonComponent } from "../ButtonComponent";
import DeleteIcon from '@mui/icons-material/Delete';

interface ConfirmationDeleteProps {
    showConfirmationDelete: boolean;
    handleShowConfirmationDelete: any;
    handleDeleteOperation: any;
    textModal: string;
}
export const ConfirmationDelete: FC<ConfirmationDeleteProps> = ({ showConfirmationDelete, handleShowConfirmationDelete, handleDeleteOperation, textModal }) => {

    return (
        <>
            <Modal
                open={showConfirmationDelete}
                onClose={handleShowConfirmationDelete}
                aria-labelledby="Confirmation Delete"
                aria-describedby="Modal for delete operation"
            >
                <Box
                    sx={styleModal}
                >
                    <Typography>
                        {textModal}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            marginTop: 2,
                            gap: 2,
                        }}>
                        <ButtonComponent
                            colorButton={'secondary'}
                            handleOnClick={handleShowConfirmationDelete}
                            textButton={"Cancelar"}
                            variantType={'text'}
                        />
                        <ButtonComponent
                            colorButton={'error'}
                            iconButton={<DeleteIcon />}
                            handleOnClick={handleDeleteOperation}
                            textButton={"Confirmar"}
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    );
};
