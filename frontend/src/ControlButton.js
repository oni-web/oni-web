import React, {Component} from "react";
import {Button, ButtonGroup} from "reactstrap";
import {Link} from "react-router-dom";
import {Container, Row} from "react-bootstrap";

class ControlButton extends Component {
    constructor(props) {
        super(props);

    }

    async handleStart() {
        const program = this.props.program;
        await fetch('/program/start/'+program, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        });
    }

    async handlePause() {
        const program = this.props.program;
        await fetch('/program/pause/'+program, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        });
    }

    async handleTerminate() {
        const program = this.props.program;
        await fetch('/program/terminate/'+program, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        });
    }

    async handleCheckResult() {
        const program = this.props.program;
        await fetch('/program/checkResult/'+program, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        });
    }
    render() {
        return(
            <Row md={2}>
                <ButtonGroup>
                    <Button size="sm" color="primary" onClick={()=>this.handleStart()}>Start</Button>
                    <Button size="sm" color="primary" onClick={()=>this.handlePause()}>Pause</Button>
                    <Button size="sm" color="primary" onClick={()=>this.handleTerminate()}>Terminate</Button>
                    <Button size="sm" color="primary" onClick={()=>this.handleCheckResult()}>Check Result</Button>
                </ButtonGroup>
            </Row>

        );
    }
}

export default ControlButton;
