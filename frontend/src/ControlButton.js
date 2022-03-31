import React, {Component, useState} from "react";
import {Button, ButtonGroup, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {Link} from "react-router-dom";
import PopupModal from "./PopupModal";


const ControlButton = ({program}) => {

    const [disabled, setDisabled] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(null);

    async function handleStart() {
        setDisabled(true);
        await fetch('/program/start/' + program, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        });
        setDisabled(false);
    }

    async function handlePause() {
        await fetch('/program/pause/' + program, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        });
    }

    async function handleTerminate() {
        await fetch('/program/terminate/' + program, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        });
    }

    async function handleCheckResult() {
        await fetch('/program/checkResult/' + program, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        }).then(res => {
            return res.json();
        }).then(data => {
            setShowModal(true);
            setData(data);
        })
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
                    <Button size="sm" className={"text-nowrap"} color={"primary"} tag={Link} to={"/detail"}>View
                        details</Button>
                </Col>
            </Row>
            <PopupModal open={showModal} setOpen={setShowModal} body={data}/>
        </Container>

    );

}

export default ControlButton;
