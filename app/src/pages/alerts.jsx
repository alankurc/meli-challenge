import React, {useEffect, useState} from "react";
import axios from "axios";
import {Container} from "reactstrap";
import Search from '../components/Search'
import AlertList from "../components/AlertList";

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:3050/alerts/");
            setAlerts(response.data);
        }
        fetchData()
    }, [])

    return (
        <>
            <Search setAlerts={setAlerts} />
            <Container>
                <AlertList alerts={alerts} />
            </Container>
        </>
    );
}

export default Alerts;