import {Col, Row, Progress, Container} from "reactstrap";
import ProgramInfo from "./ProgramInfo";
import ControlButton from "./ControlButton";
import React from "react";


const ProgramList = ({programs}) => {
    const now = 80;
    return (
        <div>
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
        </div>


    );
}
export default ProgramList;

