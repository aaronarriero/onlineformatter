import React, {Component} from "react";

class StatusBar extends Component {
    getStatus() {
        return this.props.status
    }

    getLength() {
        return this.props.text.length
    }

    getLineCount() {
        const str = this.props.text
        return str.split(/\r\n|\r|\n/).length
    }

    render() {
        return (
            <div className="status-bar clearfix">
                <span className="float-left">{this.getStatus()}</span>
                <span className="float-right status-bar-divider">Total lines: {this.getLineCount()}</span>
                <span className="float-right status-bar-divider">Length: {this.getLength()}</span>
            </div>
        );
    }
}

export default StatusBar