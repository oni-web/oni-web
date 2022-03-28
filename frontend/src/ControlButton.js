import React, {Component} from "react";
import {Button, ButtonGroup, Col, Container, Row} from "reactstrap";
import {Link} from "react-router-dom";

class ControlButton extends Component {
    constructor(props) {
        super(props);
        this.state = {disabled: false};

    }

    async handleStart() {
        this.setState({disabled: true});
        const program = this.props.program;
        await fetch('/program/start/' + program, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        });
        this.setState({disabled: false});
    }

    async handlePause() {
        const program = this.props.program;
        await fetch('/program/pause/' + program, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        });
    }

    async handleTerminate() {
        const program = this.props.program;
        await fetch('/program/terminate/' + program, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        });
    }

    async handleCheckResult() {
        const program = this.props.program;
        await fetch('/program/checkResult/' + program, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        }).then(data => {
            console.log(data);
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={"auto"}>
                        <ButtonGroup>
                            <Button disabled={this.state.disabled} size="sm" color="primary" onClick={() => this.handleStart()}>Start</Button>
                            <Button disabled={this.state.disabled} size="sm" color="primary"
                                    onClick={() => this.handlePause()}>Pause</Button>
                            <Button disabled={this.state.disabled} size="sm" color="primary"
                                    onClick={() => this.handleTerminate()}>Terminate</Button>
                            <Button disabled={this.state.disabled} className={"text-nowrap"} size="sm" color="primary"
                                    onClick={() => this.handleCheckResult()}>Check Result</Button>
                        </ButtonGroup>
                    </Col>
                    <Col md={"auto"}>
                        <Button size="sm" className={"text-nowrap"} color={"primary"} tag={Link} to={"/detail"}>View
                            details</Button>
                    </Col>
                </Row>


            </Container>

        );
    }
}

export default ControlButton;
