import {Col, Row, Progress, Container} from "reactstrap";
import React, {useEffect, useState} from "react";
import {ProgramCard} from "./ProgramCard";

const ProgramList = ({programs}) => {
    // const now = 80;


    return (
        <div>
            {
                programs.map(program => (
                    <Row>
                       <ProgramCard program={program}/>
                    </Row>
                ))
            }
        </div>


    );
}
export default ProgramList;


