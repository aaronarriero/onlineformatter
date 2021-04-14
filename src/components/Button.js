import React, { Component } from "react";

class Button extends Component {
    render() {
        const {value} = this.props
        return (
            <div>
                <button type="button" className="btn btn-primary" onClick={this.props.onClick}>{value}</button>
            </div>
        );
    }
}

export default Button;