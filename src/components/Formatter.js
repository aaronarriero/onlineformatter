import React, {Component} from "react";
import {Container, Dropdown, DropdownButton, Row} from "react-bootstrap";
import Feedback from "./Feedback";
import CopyButton from "./CopyButton";

class Formatter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '{"id":1}',
            feedback: '',
            feedbackStyle: 'primary'
        };
        this.handleChange = handleChange.bind(this)
        this.formatJSON = formatJSON.bind(this)
        this.formatXML = formatXML.bind(this)
        this.base64Encode = base64Encode.bind(this)
        this.base64Decode = base64Decode.bind(this)
        this.minifyJSON = minifyJSON.bind(this)
    }

    render() {
        return (
            <Container>
                <Row>
                    <CopyButton textArea={this.textArea}/>
                    <DropdownButton
                        variant='primary'
                        title='Format'
                        id='format'
                    >
                        <Dropdown.Item onClick={this.formatJSON}>JSON</Dropdown.Item>
                        <Dropdown.Item onClick={this.formatXML}>XML</Dropdown.Item>
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
                <div className={"textarea-wrapper"}>
                    <textarea
                        value={this.state.text}
                        onChange={this.handleChange}
                        ref={(textarea) => this.textArea = textarea}
                        name="textarea"
                    />
                </div>
                <Row>
                    <Feedback message={this.state.feedback} messageStyle={this.state.feedbackStyle}/>
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
        this.setState({text: text, feedback: 'Formatted JSON', feedbackStyle: 'success'})
    } catch (e) {
        this.setState({feedback: 'This is not JSON...', feedbackStyle: 'warning'})
    }
}

function minifyJSON() {
    try {
        let array = JSON.parse(this.state.text)
        let text = JSON.stringify(array)
        this.setState({text: text, feedback: 'Minified JSON', feedbackStyle: 'success'})
    } catch (e) {
        this.setState({feedback: 'This is not JSON...', feedbackStyle: 'warning'})
    }
}

function base64Encode() {
    let text = btoa(this.state.text)
    this.setState({text: text, feedback: 'Encoded into Base64', feedbackStyle: 'success'})
}

function base64Decode() {
    try {
        let text = atob(this.state.text)
        this.setState({text: text, feedback: 'Decoded from Base64', feedbackStyle: 'success'})
    } catch (e) {
        this.setState({feedback: 'This is not in Base64...', feedbackStyle: 'warning'})
    }
}

// https://stackoverflow.com/a/49458964
function formatXML() {
    let formatted = '', indent= '';
    let xml = this.state.text
    let tab = '\t';
    xml.split(/>\s*</).forEach(function(node) {
        if (node.match( /^\/\w/ )) indent = indent.substring(tab.length);
        formatted += indent + '<' + node + '>\r\n';
        if (node.match( /^<?\w[^>]*[^/]$/ )) indent += tab;
    });
    this.setState({text: formatted.substring(1, formatted.length-3), feedback: 'Formatted XML', feedbackStyle: 'success'})
}

export default Formatter;