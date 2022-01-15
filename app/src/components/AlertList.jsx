import React, {useState} from "react";
import {Table, Container, Row, Col} from "reactstrap";
import Paginator from '../components/Pagination'

const AlertList = ({alerts}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [alertsPerPage] = useState(5);

    //PAGINATION
    const indexOfLastAlert = currentPage * alertsPerPage;
    const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;
    const currentAlerts = alerts.slice(indexOfFirstAlert, indexOfLastAlert);
    // CHANGE PAGE
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container className="pt-5">
            <Row>
                <Col>
                    <Table hover responsive striped className="text-center">
                        <thead>
                        <tr>
                            <th width="20%">Server</th>
                            <th width="40%">Alert</th>
                            <th width="20%">Date</th>
                            <th width="20%">Server Type</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentAlerts.map(alert =>
                            <tr>
                                <td width="20%">{alert.server}</td>
                                <td width="40%">{alert.description}</td>
                                <td width="20%">{alert.created_at}</td>
                                <td width="20%">{alert.server_type}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                    <Paginator alertsPerPage={alertsPerPage} totalAlerts={alerts.length} paginate={paginate} />
                </Col>
            </Row>
        </Container>
    );
}

export default AlertList;