import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Menu extends Component {
    render() {
        return (
            <div>
                {/* MENU NAV  */}
                <nav id="menu">
                            <ul>
                                <li>
                                   <NavLink to="/home" activeClassName="active">Inicio </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/blog" activeClassName="active">Blog </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/form" activeClassName="active">Formulario</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/movies" activeClassName="active">Peliculas</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/test" activeClassName="active">Test</NavLink>
                                </li>
                            </ul>
                        </nav>
            </div>
        );
    }
}

export default Menu;