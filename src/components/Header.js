import React, { Component } from 'react';
import logo from '../assets/images/logo.svg';

// import components
import Menu from './Menu';

class Header extends Component {
    render() {
        return (
            <div>
                <header id="header">
                    <div className="center">

                        {/*  LOGO  */}
                        <div id="logo">
                            <img src={logo} className="app-logo" alt="Logotipo" />
                            <span id="brand">
                                <strong>Curso</strong>React
                           </span>
                        </div>

                        <Menu />

                        {/* LIMIPIAR FLOTADOS */}
                        <div className="clearfix"></div>
                    </div>
                </header>
            </div>
        );
    }
}

export default Header;