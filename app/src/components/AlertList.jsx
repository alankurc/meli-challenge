import React, {useState} from "react";
import {Table, Container, Row, Col} from "reactstrap";
import Paginator from '../components/Pagination'
import moment from "moment";

moment.locale("es-mx");

const AlertList = ({alerts}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [alertsPerPage] = useState(10);

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
                            <th width="30%">Alert</th>
                            <th width="30%">Date</th>
                            <th width="20%">Server Type</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentAlerts.map(alert =>
                            <tr>
                                <td width="20%">{alert.server}</td>
                                <td width="30%">{alert.description}</td>
                                <td width="30%">{moment(alert.created_at).format('h:mm:ss a, MMMM Do YYYY')}</td>
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
