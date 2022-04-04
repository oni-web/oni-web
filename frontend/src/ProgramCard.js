import React, {useEffect, useState} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Progress, Row, Label
} from 'reactstrap';

import ControlButton from "./ControlButton";


export const ProgramCard = ({program}) => {

    const [programStatus, setProgramStatus] = useState(program.status);
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle> {programStatus} </CardTitle>
                    <Row>
                        <ProgramInfo title={program.name} status={programStatus} description={program.description}/>
                        <ProgressBar programName={program.name} status={programStatus} setStatus={setProgramStatus}/>
                        <p/>
                        <ControlButton programName={program.name} setStatus={setProgramStatus}/>
                    </Row>

                </CardBody>
            </Card>
        </div>
    );
}
const ProgramInfo = ({title, status, description}) => {

    return (
        <div>
            {/*<h2>{title}: {status}</h2>*/}
            <h2>{title}</h2>
            <p>
                Program description here. {description}
            </p>

        </div>
    );

}

// const ProgressBar = ({programName, running, setRunning, status, setStatus}) => {
const ProgressBar = ({programName, status, setStatus}) => {
    const [now, setNow] = useState(0);

    useEffect(() => {
        // Check at interval, but only fetch when the program is running.
        const id = setInterval(() => {
            if (status === "running") {
                console.log(programName + " is running, check progress...")
                fetch('/program/getProgress/' + programName, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                })
                    .then(data => {
                        return data.json();
                    })
                    .then(data => {
                        let n = data.fraction * 100
                        setNow(parseInt(n));
                        setStatus(data.status);
                        console.log("executing...");
                        // TODO If the status is "finished", set now to 100.
                    })
            }
        }, 800);
        return () => clearInterval(id); //clean up the effect.
    }, [status]);
    return (
        <Progress animated value={now}>{now}%</Progress>
    );
};
