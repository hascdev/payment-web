import React from 'react';
import render from 'react-dom';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import FieldAmount from './field_amount.jsx';
import * as API from './aws.jsx';

export default class App extends React.Component {

    constructor( props ) {
        super( props );
    }

    render() {        
        return  (
                    <Card>
                        <Card.Header>Botón de Pago</Card.Header>
                        <Card.Body>
                            <Card.Title>Webpay</Card.Title>
                            <Card.Text>Ingrese monto a pagar</Card.Text>
                            <FieldAmount ref="amount" placeholder="Monto (CLP)" />
                            <Button variant="primary" onClick={this.process.bind(this)}>Iniciar Pago</Button>
                        </Card.Body>
                    </Card>
        );
    }
    
    process() {
        
        let response = (href) => {
            console.log(href);
            window.location.href = href;
        }
               
        let url = "https://td2zugl9zj.execute-api.us-east-2.amazonaws.com/debug/payment";
        
        let payment = {
            subject: 'Pago de Prueba',
            amount: this.refs.amount.state.valueUnformat,
            currency: 'CLP',
            url: {  back: '', cancel: '', picture: '', notify: '' }
        }
        
        API.post(this, url, payment, response, this.error.bind(this));
    }
    
    error(error) {
        console.log(error);
    }

}