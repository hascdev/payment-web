import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { formato_monto } from './util/functions.jsx'

export default class FieldAmount extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: (props.value ? props.value : ''), help: '', disabled: props.disabled, required: props.required, valueUnformat: (props.value ? this.parseAmount(props.value) : '') };
    }

    validationState() {
        const length = this.state.value ? this.state.value.length : 0;
        if (length > 0) {
            if (this.state.help != '') {
                return false;
            } else {
                return true;
            }
        } else if (length == 0 && this.state.help != '') {
            return false;
        }
    }

    handleChange(e) {
        
        if (this.props.validate == 'isEmpty') {
            
            var monto = formato_monto(e.target.value);
            var montoSinFormato = this.parseAmount(monto);
            
            this.setState({ value: monto, valueUnformat: montoSinFormato, help: '' });
            
            if (monto.length <= 0) {
                this.setState({ help: this.props.message[this.props.validate] });
            } else {
                this.setState({ help: '' });
            }
            
        } else {
            
            var monto = formato_monto(e.target.value);
            var montoSinFormato = parseInt(monto.toString().split('.').join(''));
            this.setState({ value: monto, valueUnformat: montoSinFormato, help: '' });
        }
    }

    render() {
        return (
            <Form noValidate validated={this.validationState()}>
            <Form.Group controlId={this.props.refs}>
                {this.props.label &&
                <Form.Label>{this.props.label} {this.state.required && <span className="required">*</span>}</Form.Label>
                }
                <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control style={ {textAlign: 'right'} } type="text" value={this.state.value} placeholder={this.props.placeholder} disabled={this.state.disabled} onChange={this.handleChange.bind(this)} maxLength={this.props.length} onBlur={this.props.onBlur} onKeyDown={this.props.onKeyDown} onContextMenu={this.props.onContextMenu}/>
                </InputGroup>
                <Form.Control.Feedback type="invalid">{this.state.help}</Form.Control.Feedback>
            </Form.Group>
            </Form>
        )
    }
    
    parseAmount(value) {
        return parseInt(value.toString().split('.').join(''));
    }
}