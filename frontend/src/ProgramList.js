import {Col, Row, Progress } from "reactstrap";
import ProgramInfo from "./ProgramInfo";
import ControlButton from "./ControlButton";
import React from "react";


const ProgramList = ({programs}) => {
    const now = 80;
    return (
        <Col md={6}>
            {
                programs.map(program => (
                    <Row>
                        <ProgramInfo title={program.name}/>

                        <Progress animated value={now}>{now}%</Progress>
                        <p/>
                        <ControlButton program={program.name}/>
                    </Row>
                ))
            }
        </Col>


    );
}
export default ProgramList;

