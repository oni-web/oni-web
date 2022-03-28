import React, {Component, useEffect, useState} from 'react';
import './App.css';
import {Button, ButtonGroup, Col, Container, Nav, Navbar, Progress, Row} from 'reactstrap';

import MyNavBar from "./MyNavBar";
import ProgramList from "./ProgramList";
import RightColumn from "./RightColumn";

const Home = () => {
    const [programs, setPrograms] = useState(null);
    const [boardTitle, setBoardTitle] = useState('Announcement');
    useEffect(() => {
        fetch('/program/')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setPrograms(data);
            })
    }, [])

    return (
        <Container fluid>
            <MyNavBar/>
            <Row>
                <Col md={6}>{programs && <ProgramList programs={programs}/>}</Col>

                <Col md={1}> </Col>
                <Col md={4}>
                    <RightColumn title={boardTitle}/>
                </Col>
            </Row>

        </Container>


    );

}

export default Home;