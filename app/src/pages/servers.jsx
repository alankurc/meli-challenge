import React, {useEffect, useState} from "react";
import axios from "axios";
import {Table} from "reactstrap";
import Paginator from '../components/Pagination'

const Servers = () => {
    const [servers, setServers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [serversPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:3050/servers/");
            setServers(response.data);
        }
        fetchData()
    }, [])

    //PAGINATION
    const indexOfLastServer = currentPage * serversPerPage;
    const indexOfFirstServer = indexOfLastServer - serversPerPage;
    const currentServers = servers.slice(indexOfFirstServer, indexOfLastServer);
    // CHANGE PAGE
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Table hover responsive striped>
                <thead>
                <tr>
                    <th>Server</th>
                    <th>Alert</th>
                    <th>Date</th>
                    <th>Server Type</th>
                </tr>
                </thead>
                <tbody>
                {currentServers.map(server =>
                    <tr>
                        <td>{alert.server}</td>
                        <td>{alert.description}</td>
                        <td>{alert.created_at}</td>
                        <td>{alert.server_type}</td>
                    </tr>
                )}
                </tbody>
            </Table>
            <Paginator alertsPerPage={serversPerPage} totalServers={servers.length} paginate={paginate} />
        </>
    );
}

export default Servers;