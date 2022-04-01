import React, {useEffect, useState} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Progress, Row
} from 'reactstrap';

import ControlButton from "./ControlButton";


export const ProgramCard = ({program}) => {

    const [running, setRunning] = useState(program.status === "running");
    return (
        <div>
            <Card>
                {/*<CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />*/}
                <CardBody>
                    {/*<CardTitle>{program.name}</CardTitle>*/}
                    {/*<CardSubtitle>Card subtitle</CardSubtitle>*/}

                    {/*<CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>*/}
                    {/*<Button>Button</Button>*/}
                    <Row>
                        <ProgramInfo title={program.name}/>
                        <ProgressBar programName={program.name} running={running} setRunning={setRunning}/>
                        <p/>
                        <ControlButton programName={program.name} setRunning={setRunning}/>
                    </Row>

                </CardBody>
            </Card>
        </div>
    );
}
const ProgramInfo = ({title}) => {

    return (
        <div>
            <h2>{title}</h2>
            <p>
                Program description here.
            </p>

        </div>
    );

}

const ProgressBar = ({programName, running, setRunning}) => {
    const [now, setNow] = useState(0);



    useEffect(() => {
        // Check at interval, but only fetch when the program is running.
        const id = setInterval(() => {
            if (running) {
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
                        if (data.status === "running") {
                            setRunning(true);


                        } else {
                            setRunning(false);


                        }
                    })
            }
        }, 800);
        return () => clearInterval(id); //clean up the effect.
    }, [running]);
    return (
        <Progress animated value={now}>{now}%</Progress>
    );
};
