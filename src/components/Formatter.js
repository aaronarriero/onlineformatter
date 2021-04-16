import React, {Component, Fragment} from "react";
import {Button, Dropdown, DropdownButton, Row} from "react-bootstrap";
import StatusBar from "./StatusBar";
import { saveAs } from 'file-saver';

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
        this.clear = clear.bind(this)
        this.save = save.bind(this)
        this.escapeQuotes = escapeQuotes.bind(this)
        this.unescapeQuotes = unescapeQuotes.bind(this)
        this.urlEncode = urlEncode.bind(this)
        this.urlDecode = urlDecode.bind(this)
    }

    render() {
        return (
            <Fragment>
                <Row className="button-row">
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
                    <DropdownButton
                        variant='primary'
                        title='Quotes'
                        id='quotes'
                    >
                        <Dropdown.Item onClick={this.escapeQuotes}>Escape</Dropdown.Item>
                        <Dropdown.Item onClick={this.unescapeQuotes}>Unescape</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                        variant='primary'
                        title='URL'
                        id='url'
                    >
                        <Dropdown.Item onClick={this.urlEncode}>Encode</Dropdown.Item>
                        <Dropdown.Item onClick={this.urlDecode}>Decode</Dropdown.Item>
                    </DropdownButton>
                    <Button
                        variant='primary'
                        title='Save to...'
                        id='save'
                        onClick={this.save}>
                        Save to...
                    </Button>
                    <Button
                        variant='primary'
                        title='Clear'
                        id='clear'
                        onClick={this.clear}>
                        Clear
                    </Button>
                </Row>
                <Row className="textarea-row">
                    <textarea
                        value={this.state.text}
                        onChange={this.handleChange}
                        ref={(textarea) => this.textArea = textarea}
                        name="textarea"
                    />
                </Row>
                <Row className="status-bar-row">
                    <StatusBar text={this.state.text} statusMessage={this.state.statusMessage}/>
                </Row>
            </Fragment>
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

function clear() {
    this.setState({text: ''})
    this.setState({statusMessage: 'Text cleared'})
}

function save() {
    try {
        var blob = new Blob([this.state.text], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "pasta.txt");
        this.setState({statusMessage: 'Saved contents to file'})
    } catch (e) {
        this.setState({statusMessage: 'Saving files is not supported by your browser'})
    }
}

function escapeQuotes() {
    const escapedText = this.state.text.replace(/"/g, '\\"');
    this.setState({text: escapedText, statusMessage: 'Escaped quotes'})
}

function unescapeQuotes() {
    const unescapedText = this.state.text.replace(/\\"/g, '"')
    this.setState({text: unescapedText, statusMessage: 'Unescaped quotes'})
}

function urlEncode() {
    const urlEncodedText = encodeURI(this.state.text)
    this.setState({text: urlEncodedText, statusMessage: 'URL encoded'})
}

function urlDecode() {
    const urlDecodedText = decodeURI(this.state.text)
    this.setState({text: urlDecodedText, statusMessage: 'URL decoded'})
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