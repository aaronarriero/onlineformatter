import React, {Component, Fragment} from "react";
import {Badge, Button, Dropdown, DropdownButton, Row} from "react-bootstrap";
import StatusBar from "./StatusBar";
import { saveAs } from 'file-saver';

class Formatter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '{"id":1}',
            undoStack: [],
            redoStack: [],
            status: 'Waiting for input...'
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
        this.undo = undo.bind(this)
        this.redo = redo.bind(this)
    }

    forwardText(text) {
        if (this.state.text !== text) {
            this.setState({text: text, undoStack: [...this.state.undoStack, this.state.text], redoStack: []})
        }
    }

    backwardText(text) {
        this.setState({text: text, redoStack: [...this.state.redoStack, this.state.text]})
    }

    setStatus(status) {
        this.setState({status: status})
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
                        title='Undo'
                        id='undo'
                        onClick={this.undo}>
                        Undo&nbsp;
                        <Badge variant="light">{this.state.undoStack.length}</Badge>
                    </Button>
                    <Button
                        variant='primary'
                        title='Redo'
                        id='redo'
                        onClick={this.redo}>
                        Redo&nbsp;
                        <Badge variant="light">{this.state.redoStack.length}</Badge>
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
                    <StatusBar text={this.state.text} status={this.state.status}/>
                </Row>
            </Fragment>
        );
    }
}

function handleChange(e) {
    this.setState({text: e.target.value})
}

function copyToClipboard(e) {
    this.textArea.select();
    document.execCommand('copy');
    e.target.focus();
    this.setStatus('Text copied to clipboard')
}

function clear() {
    this.forwardText('')
    this.setStatus('Text cleared')
}

function save() {
    try {
        var blob = new Blob([this.state.text], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "pasta.txt");
        this.setStatus('Saved contents to file')
    } catch (e) {
        this.setStatus('Saving files is not supported by your browser')
    }
}

function undo() {
    if (this.state.undoStack.length > 0) {
        this.backwardText(this.state.undoStack.pop())
        this.setStatus('Undo')
    } else {
        this.setStatus('Nothing to undo')
    }
}

function redo() {
    if (this.state.redoStack.length > 0) {
        // this.setState({
        //     undoStack: [...this.state.undoStack, this.state.redoStack.pop()]
        // })
        this.setState({text: this.state.redoStack.pop(), undoStack: [...this.state.undoStack, this.state.text]})
        this.setStatus('Redo')
    } else {
        this.setStatus('Nothing to redo')
    }
}

function escapeQuotes() {
    const escapedText = this.state.text.replace(/"/g, '\\"');
    this.forwardText(escapedText)
    this.setStatus('Escaped quotes')
}

function unescapeQuotes() {
    const unescapedText = this.state.text.replace(/\\"/g, '"')
    this.forwardText(unescapedText)
    this.setStatus('Unescaped quotes')
}

function urlEncode() {
    const urlEncodedText = encodeURI(this.state.text)
    this.forwardText(urlEncodedText)
    this.setStatus('URL encoded')
}

function urlDecode() {
    const urlDecodedText = decodeURI(this.state.text)
    this.forwardText(urlDecodedText)
    this.setStatus('URL decoded')
}

function formatJSON() {
    try {
        let array = JSON.parse(this.state.text)
        let text = JSON.stringify(array, null, '  ')
        this.forwardText(text)
        this.setStatus('Formatted JSON')
    } catch (e) {
        this.setStatus('This is not JSON...')
    }
}

function minifyJSON() {
    try {
        let array = JSON.parse(this.state.text)
        let text = JSON.stringify(array)
        this.forwardText(text)
        this.setStatus('Minified JSON')
    } catch (e) {
        this.setStatus('This is not JSON...')
    }
}

function base64Encode() {
    let text = btoa(this.state.text)
    this.forwardText(text)
    this.setStatus('Encoded into Base64')
}

function base64Decode() {
    try {
        let text = atob(this.state.text)
        this.forwardText(text)
        this.setStatus('Decoded from Base64')
    } catch (e) {
        this.setStatus('This is not in Base64...')
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
    this.forwardText(formatted.substring(1, formatted.length-3))
    this.setStatus('Formatted XML')
}

export default Formatter;