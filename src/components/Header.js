import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";

class Header extends Component {
    render() {
        return (
            <Row>
                <Col>
                    <h1>Online formatter</h1>
                    <p>Privately format JSON and XML online on this fully clientside online formatter.</p>
                </Col>
            </Row>
        );
    }
}

export default Header;