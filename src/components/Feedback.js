import React, {Component} from "react";
import {Alert} from "react-bootstrap";

class Feedback extends Component {
    render() {
        const {message, messageStyle} = this.props
        return (
            message &&
            <Alert
                key="feedbackAlert"
                variant={messageStyle}
                role="alert"
            >
                {message}
            </Alert>
        );
    }
}

export default Feedback