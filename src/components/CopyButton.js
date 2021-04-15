import React from 'react';
import {Button} from "react-bootstrap";

class CopyButton extends React.Component {
    copyToClipboard = (e) => {
        if (this.props.textArea) {
            this.props.textArea.select();
            document.execCommand('copy');
            e.target.focus();
            this.setState({feedback: 'Text copied to clipboard', feedbackStyle: 'success'})
        }
    };

    render() {
        return (
            <div>
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
            </div>
        );
    }

}

export default CopyButton;