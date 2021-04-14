import React, {Component, Fragment} from "react";
import Button from "./Button";

class Formatter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            feedback: ''
        };
        this.handleChange = handleChange.bind(this)
        this.formatJSON = formatJSON.bind(this)
    }

    render() {
        return (
            <Fragment>
                <Button onClick={this.formatJSON} value='Format JSON'/>
                <textarea
                    value={this.state.text}
                    onChange={this.handleChange}
                    name="textarea"
                    rows={4}
                    cols={50}
                />
                <span>{this.state.feedback}</span>
            </Fragment>
        );
    }
}

function handleChange(e) {
    this.setState({text: e.target.value})
}

function formatJSON() {
    try {
        let array = JSON.parse(this.state.text)
        let payload = JSON.stringify(array, null, '  ')
        this.setState({text: payload, feedback: 'JSON formatting done!'})
    } catch (e) {
        this.setState({feedback: 'This is not JSON...'})
    }
}

export default Formatter;