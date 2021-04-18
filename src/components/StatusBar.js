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
                <span className="float-right">Length: {this.getLength()} | Total lines: {this.getLineCount()}</span>
            </div>
        );
    }
}

export default StatusBar