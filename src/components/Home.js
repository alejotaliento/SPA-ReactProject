import React, { Component } from 'react';

// components
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Home extends Component {
    render() {
        return (
            <div id="home">
                <Slider
                    size="slider-big"
                    title="Bienvenido a mi pagina desarrollada con el Framework ReactJs"
                    btn="Ir al blog" 
                />
                <div className="center">
                    <div id="content">
                        <h2 className="sub-header">Last Articles</h2>

                        <Articles 
                            last = {true}
                        />
                    </div>
                    <Sidebar 
                        changes={false}
                    />
                </div>
            </div>
        );
    }
}

export default Home;