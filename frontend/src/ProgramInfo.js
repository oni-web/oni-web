import React, {Component} from "react";
import {Button, ProgressBar, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

class ProgramInfo extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <span className="badge badge-default">Label</span>
                <h2>{this.props.title}</h2>
                <p>
                    Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1
                    Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1
                    Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1Graph 1
                </p>

                <Button color={"secondary"} tag={Link} to={"/detail"}>View details » (Not finished)</Button>
                <div>
                    <ProgressBar animated now={30} />
                </div>



            </div>
        );
    }
}

export default ProgramInfo;