import React, {Component, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

// class PopupModal extends Component {
const PopupModal = ({open, setOpen, body, size}) => {

    const toggle = () => {
        setOpen(!open);
    }


    return (
        <div>
            <Modal isOpen={open} toggle={toggle} fade={false} size={size}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody style={{whiteSpace: "pre-wrap"}}>
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