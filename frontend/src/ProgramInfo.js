import React, {Component} from "react";

import {Link} from "react-router-dom";


const ProgramInfo = ({title}) => {

    return (
        <div>
            <span className="badge badge-default">Label</span>
            <h2>{title}</h2>
            <p>
                Program description here.
            </p>

        </div>
    );

}

export default ProgramInfo;