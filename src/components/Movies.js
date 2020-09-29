import React, { Component } from 'react';
import Movie from './Movie';

//components
import Slider from './Slider';
import Sidebar from './Sidebar';

class Movies extends Component {

    /* constructor(props) {
        super(props);
        this.state = {};
    } */

    state = {
    };

    changeTitle = () => {
        var { movies } = this.state;
        //var random = Math.floor(Math.random() * 3);

        movies[0].title = "Title changed ";// + random;

        this.setState({
            movies: movies
        });
    }

    movieFavorite = (movie, index) => {
        console.log("Marked as favorite " + index);
        this.setState({
            movieFav: movie
        });
    }

    removeFavMovie = (movieFav) => {
        this.setState({
            movieFav: new Movie()
        });
    }

    // componentDidUpdate(){} cuando el componente se actualiza o modifica de cualquier tipo ejecuta su contenido

    componentWillMount() { // antes de montarse/cargarse el componente ejecuta su contenido
        /* The recommended upgrade path for most use cases is to move data-fetching into componentDidMount: */
        // alert("Component Movies will be mounted");
        this.setState({
            movies: [
                // Object definition literally on documents Json
                { year: 2020, title: "Batman", image: 'https://image.shutterstock.com/image-photo/kiev-ukraine-april-16-2015-260nw-276697244.jpg' },
                { year: 2014, title: "The incledibles", image: 'https://img.pngio.com/the-incredibles-logo-postcard-zazzlecom-the-incredibles-logo-540_540.jpg' },
                { year: 2020, title: "Lion King", image: 'https://img.jakpost.net/c/2019/04/11/2019_04_11_69752_1554952087._large.jpg' }
            ],
            movieFav: new Movie()
        });
    }

    componentDidMount() { // cuando se monta/carga el componente ese es el primer metodo que se ejecuta si contenido
        // alert("Component Movies is did mount");
        console.log(this.state);
    }

    componentWillUnmount() { // cuando se va a quitar de la ejecucion un componente se ejecuta su contenido
        // alert("Component Movies will be unmount");
    }

    render() { //Mandatory method ever on component
        const pStyle = {
            background: 'green',
            color: 'white',
            padding: '1rem'
        };

        var favMovie;
        if (this.state.movieFav.title) {
            favMovie = (
                <p className="movie-favorite" style={pStyle}>
                    <strong>The favorite movie is: </strong>
                    <span>
                        {this.state.movieFav.title}
                        {this.state.movieFav.index}
                    </span>
                    <button className="btn btn-warning" onClick={this.removeFavMovie}>Remove</button>
                </p>
            );
        } else {
            favMovie = (
                <p>Not there favorites movies</p>
            );
        }

        return (
            <div id="movies">
                <Slider
                    size="slider-small"
                    title="Movies"
                />
                <div className="center">
                    <div id="content">

                        <h2 className="sub-header">Last movies</h2>
                        <p>Selecction of favorites movies</p>

                        {/* Condicional */}  {/*  && indica que es un if */}
                        {/* this.state.movieFav.title ? (  // ? indica condicion ternaria
                            <p className="movie-favorite" style={pStyle}>
                                <strong>The favorite movie is: </strong>
                                <span>
                                {this.state.movieFav.title}
                                {this.state.movieFav.index}
                                </span>
                                <button className="btn btn-warning" onClick={this.removeFavMovie}>Remove</button>
                            </p>
                        ) : ( // : indica condicion else 
                            <p>Not there favorites movies</p>
                        )*/}

                        {favMovie}

                        <div id="articles" className="peliculas">
                            <button className="btn-success" onClick={this.changeTitle}>Change title of Batman movie</button>

                            {/* Crear componente movies */}
                            {
                                this.state.movies.map((movie, i) => {
                                    return (
                                        <Movie
                                            key={i}
                                            movie={movie}
                                            index={i}
                                            markAsFavorite={this.movieFavorite}
                                        />
                                    )
                                })
                            }
                        </div>

                        {/* <!-- LIMIPIAR FLOTADOS --> */}
                        <div className="clearfix"></div>

                    </div> {/* End _content  */}

                    <Sidebar />

                </div>  {/* End .center  */}
            </div>  /* End _movies  */
        );
    }
}

export default Movies;
