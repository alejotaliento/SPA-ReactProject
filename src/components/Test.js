import React, { Component } from 'react';
import MiComponente from './MiComponente';

class Test extends Component {

    /* constructor(props) {
        super(props);

        this.state = { // propiedades que se muestran en la vista y que son dinamicas (totalmente reactivas)
            contador: 0
        };
    } */

    state = { // propiedades que se muestran en la vista y que son dinamicas (totalmente reactivas)
        contador: 0
    };


    //methods
    sumar = (e) => {
        this.setState({
            contador: (this.state.contador + 1)
        });
    }

    restar = (e) => {
        this.setState({
            contador: (this.state.contador - 1)
        });
    }

    render() {
        return (
            <div>
                <MiComponente />

                <h2>Estado</h2>
                <p>Contador: {this.state.contador}</p>
                <input type="button" value="Sumar" onClick={this.sumar} />
                <input type="button" value="Restar" onClick={this.restar} />
            </div>

        );
    }
}

export default Test;