import React, {Component} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import {Button, ButtonGroup, Col, Container, Nav, Navbar, Progress, Row} from 'reactstrap';
import AppNavBar from "./AppNavBar";
import {ProgressBar} from "react-bootstrap";
import ControlButton from "./ControlButton";
import ProgramInfo from "./ProgramInfo";
import MyNavBar from "./MyNavBar";

class Home extends Component {
    board_title = 'Announcement';
    right_column = (
        <Row>

            <h3>{this.board_title}</h3>
            <h4>
                Project
            </h4>
            <p>
                Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris
                condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis
                euismod. Donec sed odio dui.
            </p>
            <p>
                <a className="btn" href="#">View details »</a>
            </p>
            <table className="table">
                <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>
                        Project
                    </th>
                    <th>
                        Person
                    </th>
                    <th>
                        Status
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        1
                    </td>
                    <td>
                        Project1
                    </td>
                    <td>
                        01/04/2012
                    </td>
                    <td>
                        Default
                    </td>
                </tr>
                <tr className="table-active">
                    <td>
                        2
                    </td>
                    <td>
                        Project2
                    </td>
                    <td>
                        01/04/2012
                    </td>
                    <td>
                        Approved
                    </td>
                </tr>
                <tr className="table-success">
                    <td>
                        3
                    </td>
                    <td>
                        Project3
                    </td>
                    <td>
                        02/04/2012
                    </td>
                    <td>
                        Declined
                    </td>
                </tr>
                <tr className="table-warning">
                    <td>
                        4
                    </td>
                    <td>
                        Project4
                    </td>
                    <td>
                        03/04/2012
                    </td>
                    <td>
                        Pending
                    </td>
                </tr>
                <tr className="table-danger">
                    <td>
                        5
                    </td>
                    <td>
                        Project5
                    </td>
                    <td>
                        04/04/2012
                    </td>
                    <td>
                        Call in to confirm
                    </td>
                </tr>
                </tbody>
            </table>
            <address>
                <strong>ONI LAB</strong><br/> 900 University Ave<br/> Riverside, CA 92521<br/> <abbr
                title="Phone">P:</abbr> (123) 456-7890
            </address>
        </Row>

    );

    render() {
        return (
            <Container fluid>
                <MyNavBar/>
                <Row>
                    <Col md={6}>
                        <Row>
                            <ProgramInfo title={"program1"}/>
                            <ControlButton program={"12323412343"}/>
                        </Row>
                        <Row>
                            <ProgramInfo title={"program1"}/>
                            <ControlButton/>
                        </Row>
                        <Row>
                            <ProgramInfo title={"program1"}/>
                            <ControlButton/>
                        </Row>
                    </Col>
                    <Col md={1}> </Col>
                    <Col md={4}>
                        {this.right_column};
                    </Col>
                </Row>

            </Container>


        );
    }
}

export default Home;