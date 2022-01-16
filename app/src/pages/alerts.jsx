import React, {useEffect, useState} from "react";
import axios from "axios";
import {Container} from "reactstrap";
import Search from '../components/Search'
import AlertList from "../components/AlertList";
import Error from "../components/Error";

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [error, setError] = useState(null);

    const cleanErrors = () => error && setError(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:3050/alerts/");
            setAlerts(response.data);
        }
        fetchData()
    }, [])

    return (
        <>
            <Search setAlerts={setAlerts} setError={setError} cleanErrors={cleanErrors} />
            <Container>
                {error ? <Error error={error} /> : <AlertList alerts={alerts} />}
            </Container>
        </>
    );
}

export default Alerts;