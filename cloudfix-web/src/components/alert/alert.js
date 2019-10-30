import React, { useState } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export const Alert = ({open, title, message, iconTitle, iconButton, buttonColor, removeAlert}) => {
    const [modalOpen, setModalOpen] = useState(open || false);

    const handleClose = () => {setModalOpen(false); removeAlert(null)};

    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
            basic
            size="small"
        >
            <Header icon={iconTitle} content={title} />
            <Modal.Content>
                <h3>{message}</h3>
            </Modal.Content>
            <Modal.Actions>
                <Button color={buttonColor} onClick={handleClose}>
                    <Icon name={iconButton} /> Ok
                </Button>
            </Modal.Actions>
        </Modal>
    );
};