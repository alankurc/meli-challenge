import React from "react";
import {Link} from "react-router-dom";

function Alerts() {
    return (
        <div>
            <p>Alerts</p>
            <Link to="/servers">Ver Servers</Link>
        </div>
    )
}

export default Alerts;