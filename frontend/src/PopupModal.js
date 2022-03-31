import React, {Component, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

// class PopupModal extends Component {
const PopupModal = ({open, setOpen, body}) => {

    const toggle = () => {
        setOpen(!open);
    }


    return (
        <div>
            <Modal isOpen={open} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    {body}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Close</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );


}

export default PopupModal;