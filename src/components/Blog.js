import React, { Component } from 'react';

//import component 
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Blog extends Component {
    render() {
        return (
            <div id="blog">
                <Slider
                    size="slider-small"
                    title="Blog"
                />
                <div className="center">
                    <div id="content">
                        <Articles />
                    </div>
                    <Sidebar
                        changes={true}
                    />
                </div>
            </div>
        );
    }
}

export default Blog;