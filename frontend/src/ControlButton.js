import React, {Component, useState} from "react";
import {Button, ButtonGroup, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {Link} from "react-router-dom";
import PopupModal from "./PopupModal";


const ControlButton = ({programName, setStatus}) => {

    const [disabled, setDisabled] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(null);
    const [size, setSize] = useState("md");
    const [images, setImages] = useState([]);

    async function handleStart() {
        setDisabled(true);
        await fetch('/program/start/' + programName, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        });
        setDisabled(false);
        setStatus("running");
    }

    async function handlePause() {
        await fetch('/program/pause/' + programName, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        });
    }

    async function handleTerminate() {
        await fetch('/program/terminate/' + programName, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        });
        setStatus("stopped");
    }

    async function handleCheckResult() {
        await fetch('/program/checkResult/' + programName, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        }).then(res => {
            return res.json();
        }).then(data => {
            let text = data.textResult;
            let imageStrings = data.imgResult;
            let images = Array();
            imageStrings.forEach(
                imgString => {
                    let src = "data:image/png;base64," + imgString;
                    images.push(src);

                });
            setData(text);
            setImages(images);
            setSize("lg");
            setShowModal(true);
        });
    }

    async function handleViewDetails() {
        await fetch('program/getDetails/' + programName, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        }).then(res => {
            return res.json();
        })
            .then(data => {
                let codes = data.codes;
                // console.log(codes);
                setSize("lg");
                setData(codes);
                setImages([]);
                setShowModal(true);
            });

    }


    return (
        <Container>
            <Row>
                <Col md={"auto"}>
                    <ButtonGroup>
                        <Button disabled={disabled} size="sm" color="primary"
                                onClick={() => handleStart()}>Start</Button>
                        <Button disabled={disabled} size="sm" color="primary"
                                onClick={() => handlePause()}>Pause</Button>
                        <Button disabled={disabled} size="sm" color="primary"
                                onClick={() => handleTerminate()}>Terminate</Button>
                        <Button disabled={disabled} className={"text-nowrap"} size="sm" color="primary"
                                onClick={() => handleCheckResult()}>Check Result</Button>
                    </ButtonGroup>
                </Col>
                <Col md={"auto"}>
                    <Button size="sm" className={"text-nowrap"} color={"primary"}
                            onClick={() => handleViewDetails()}>View details</Button>
                </Col>
            </Row>
            <PopupModal open={showModal} setOpen={setShowModal} body={data} images={images} size={size}/>
        </Container>

    );

}

export default ControlButton;
