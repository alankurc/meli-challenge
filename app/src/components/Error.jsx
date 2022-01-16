import React from "react";
import {Container, Row, Col} from "reactstrap";

const Error = ({error}) => {
    return (
        <Container>
            <Row>
                <Col className="text-center pt-5">
                    <h3>{error}</h3>
                </Col>
            </Row>
        </Container>
    );
}

export default Error;