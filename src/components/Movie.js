import React from 'react';

class Movie extends React.Component {
    state = {
        url: ""
    }

    movieFavorite = () => {
        return this.props.markAsFavorite(this.props.movie, this.props.index); // utilizo la prop del componente padre, en un metodo del componente hijo
        // para porder usar el onClick sin fallas
    }


    render() {
        const { title, image } = this.props.movie; // destructuring props

        return (
            <div>
                <article className="article-item article-detail" id="article-template">
                    <div className="image-wrap">
                        <img src={image} alt={title} />
                    </div>

                    <h2>{title}</h2>
                    <p>Description of article</p>
                    <span className="date">
                        5 minutes ago
                    </span>

                    <button className="btn-success" onClick={this.movieFavorite}>Mark as a favorite</button><br />

                    <a href={this.state.url}><br />Read more</a>

                    {/* LIMIPIAR FLOTADOS */}
                    <div className="clearfix"></div>

                </article>
            </div>
        );
    }
}

export default Movie;
