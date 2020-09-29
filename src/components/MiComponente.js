import React, { Component } from 'react';

//components
import StaticMessage from './StaticMessage'

class MiComponente extends Component {

    render() { // render es el encargado de mostrar informacion por pantalla

        let receta = {
            nombre: 'pizza',
            ingredientes: ['tomate', 'queso', 'jamon cocido'],
            calorias: 400
        };

        return (
            <div className="mi-componente">

                <br/>
                <hr/>
                <StaticMessage />
                <hr/>

                {/* Conditional IF */}
                {this.props.greeting &&
                    <React.Fragment>
                        <h1>Desde una prop</h1>
                        <h3>{this.props.greeting}</h3>
                        <hr />
                    </React.Fragment>
                }

                <ol>
                    <h1>{'Receta: ' + receta.nombre}</h1>
                    <h2>{'Calorias: ' + receta.calorias}</h2>
                    <hr />
                    <h3>Ingredientes:</h3>
                    {
                        receta.ingredientes.map((ingrediente, i) => { // map() para recorer un array, funcion de call back con obj e indice
                            console.log(ingrediente);
                            return (
                                <li key={i}>
                                    {ingrediente}
                                </li>
                            );
                        })
                    }
                </ol>
                <hr />
            </div>
        );
    }
}

export default MiComponente;