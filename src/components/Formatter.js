import React, {Component} from "react";
import {Button, Container, Dropdown, DropdownButton, Row} from "react-bootstrap";
import StatusBar from "./StatusBar";

class Formatter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '{"id":1}',
            statusMessage: 'Waiting for input...',
            statusStyle: 'primary'
        };
        this.handleChange = handleChange.bind(this)
        this.formatJSON = formatJSON.bind(this)
        this.formatXML = formatXML.bind(this)
        this.base64Encode = base64Encode.bind(this)
        this.base64Decode = base64Decode.bind(this)
        this.minifyJSON = minifyJSON.bind(this)
        this.copyToClipboard = copyToClipboard.bind(this)
    }

    render() {
        return (
            <Container>
                <Row>
                    {
                        document.queryCommandSupported('copy') &&
                        <Button
                            variant='primary'
                            title='Copy'
                            id='copy'
                            onClick={this.copyToClipboard}>
                            Copy
                        </Button>
                    }
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
                <Row>
                    <textarea
                        value={this.state.text}
                        onChange={this.handleChange}
                        ref={(textarea) => this.textArea = textarea}
                        name="textarea"
                    />
                </Row>
                <Row>
                    <StatusBar text={this.state.text} statusMessage={this.state.statusMessage}/>
                </Row>
            </Container>
        );
    }
}

function handleChange(e) {
    this.setState({text: e.target.value})
}

function copyToClipboard(e) {
    if (this.textArea) {
        this.textArea.select();
        document.execCommand('copy');
        e.target.focus();
        this.setState({statusMessage: 'Text copied to clipboard'})
    }
}

function formatJSON() {
    try {
        let array = JSON.parse(this.state.text)
        let text = JSON.stringify(array, null, '  ')
        this.setState({text: text, statusMessage: 'Formatted JSON'})
    } catch (e) {
        this.setState({statusMessage: 'This is not JSON...'})
    }
}

function minifyJSON() {
    try {
        let array = JSON.parse(this.state.text)
        let text = JSON.stringify(array)
        this.setState({text: text, statusMessage: 'Minified JSON'})
    } catch (e) {
        this.setState({statusMessage: 'This is not JSON...'})
    }
}

function base64Encode() {
    let text = btoa(this.state.text)
    this.setState({text: text, statusMessage: 'Encoded into Base64'})
}

function base64Decode() {
    try {
        let text = atob(this.state.text)
        this.setState({text: text, statusMessage: 'Decoded from Base64'})
    } catch (e) {
        this.setState({statusMessage: 'This is not in Base64...'})
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
    this.setState({text: formatted.substring(1, formatted.length-3), statusMessage: 'Formatted XML'})
}

export default Formatter;