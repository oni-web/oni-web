import React, {Component, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
// class PopupModal extends Component {
const PopupModal = ({open, setOpen, body, images, size}) => {

    const toggle = () => {
        setOpen(!open);
    }

    console.log("body: " + body);

    return (
        <div>
            <Modal isOpen={open} toggle={toggle} fade={false} size={size}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody style={{whiteSpace: "pre-wrap"}}>
                    {body}
                    {
                        images.map((imageSrc) => {
                            return (
                                <TransformWrapper wheel={{step:0.1}} maxScale={4}>
                                    <TransformComponent>
                                        <img src={imageSrc} className="img-thumbnail" width={800}/>
                                        {/*<img src={imageSrc} width={800}/>*/}
                                    </TransformComponent>
                                </TransformWrapper>);


                        })

                    }

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Close</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );


}

export default PopupModal;