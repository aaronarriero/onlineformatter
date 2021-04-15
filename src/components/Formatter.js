import React, {Component} from "react";
import {Container, Dropdown, DropdownButton, Row} from "react-bootstrap";

class Formatter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '{"id":1}',
            feedback: ''
        };
        this.handleChange = handleChange.bind(this)
        this.formatJSON = formatJSON.bind(this)
        this.base64Encode = base64Encode.bind(this)
        this.base64Decode = base64Decode.bind(this)
        this.minifyJSON = minifyJSON.bind(this)
    }

    render() {
        return (
            <Container>
                <Row>
                <DropdownButton
                    variant='primary'
                    title='Format'
                    id='format'
                >
                    <Dropdown.Item onClick={this.formatJSON}>JSON</Dropdown.Item>
                </DropdownButton>
                <DropdownButton
                    variant='primary'
                    title='Minify'
                    id='minify'
                >
                    <Dropdown.Item onClick={this.minifyJSON}>JSON</Dropdown.Item>
                </DropdownButton>
                <DropdownButton
                    variant='primary'
                    title='Base 64'
                    id='base64'
                >
                    <Dropdown.Item onClick={this.base64Encode}>Encode</Dropdown.Item>
                    <Dropdown.Item onClick={this.base64Decode}>Decode</Dropdown.Item>
                </DropdownButton>
                </Row>
                <Row>
                    <textarea
                        value={this.state.text}
                        onChange={this.handleChange}
                        name="textarea"
                        rows={4}
                        cols={50}
                    />
                </Row>
                <Row>
                    <span>{this.state.feedback}</span>
                </Row>
            </Container>
        );
    }
}

function handleChange(e) {
    this.setState({text: e.target.value})
}

function formatJSON() {
    try {
        let array = JSON.parse(this.state.text)
        let text = JSON.stringify(array, null, '  ')
        this.setState({text: text, feedback: 'Formatted JSON'})
    } catch (e) {
        this.setState({feedback: 'This is not JSON...'})
    }
}

function minifyJSON() {
    try {
        let array = JSON.parse(this.state.text)
        let text = JSON.stringify(array)
        this.setState({text: text, feedback: 'Minified JSON'})
    } catch (e) {
        this.setState({feedback: 'This is not JSON...'})
    }
}

function base64Encode() {
    let text = btoa(this.state.text)
    this.setState({text: text, feedback: 'Encoded into Base64'})
}

function base64Decode() {
    try {
        let text = atob(this.state.text)
        this.setState({text: text, feedback: 'Decoded from Base64'})
    } catch (e) {
        this.setState({feedback: 'This is not in Base64...'})
    }

}

export default Formatter;