import React, {useState} from "react";
import axios from "axios";
import {Form, FormGroup, Button, Input, Label, Navbar, Container, Row, Col} from "reactstrap";

const Search = ({setAlerts}) => {

    const [searchType, setSearchType] = useState("alerts");
    const [error, setError] = useState("");

    const searchAlerts = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.get(`http://localhost:3050/${searchType}/${e.target[0].value}`)
            setAlerts(response.data);
        } catch (e) {
            switch (searchType) {
                case "alerts":
                    setError("No hay alertas con ese nombre");
                    break;
                case "servers":
                    setError("No hay servers con ese nombre");
                    break;
                default:
                    setError("Ha ocurrio un error");
            }
        }

    }

    const onSearchTypeChange = ({target: {value}}) => {
        setSearchType(value);
    }

    return (
        <Navbar expand="true">
            <Container>
                <Row>
                    <Col lg={{size:4}} xl={{size:3}} className="d-flex justify-content-center align-items-center">
                        <Form onChange={onSearchTypeChange}>
                            <FormGroup check>
                                <Input name="radio1" type="radio" value="alerts" checked={searchType === "alerts"}/>
                                <Label check className="mb-0">Por Alerta</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input name="radio1" type="radio" value="servers" checked={searchType === "servers"}/>
                                <Label check className="mb-0">Por Server</Label>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col lg={{size:8}} xl={{size:9}}>
                        <Form onSubmit={searchAlerts}>
                            <FormGroup className="d-flex mt-3">
                                <Input bsSize="lg" type="text" placeholder={searchType === "alerts" ? "Buscar por nombre de Alerta" : "Buscar por nombre de Server"} name="description" className="search-nav"/>
                                <Button className="search-button">Buscar</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
}

export default Search;