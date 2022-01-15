import React from "react";
import {Link} from "react-router-dom";

function Servers() {
    return (
        <div>
            <p>Servers</p>
            <Link to="/alerts">Ver Alerts</Link>
        </div>
    )
}

export default Servers;