import React, { Component } from 'react';

//import comoponents
import Slider from './Slider';
import Articles from './Articles';

class Search extends Component {
    render() {
        var searched = this.props.match.params.search; // get params of the url

        return (
            <div id="search">
                <Slider
                    size="slider-small"
                    title={"Search: " + searched}
                />
                <div className="center">
                    <div id="content">
                        <h1 className="sub-header">Results</h1>
                        {/* List of articles from api rest with node */}
                        <Articles 
                            search={searched}                        />

                    </div>
                </div>
            </div>
        );
    }
}

export default Search;