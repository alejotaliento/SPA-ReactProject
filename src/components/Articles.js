import React, { Component } from 'react';

//import modules
import axios from 'axios';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment/locale/es'; // import Spanish lenguage
import { Global } from '../Global';

//import images/logos
import NotImage from '../assets/images/image-not-available.jpg';

class Articles extends Component {

    state = {
        articles: [],
        last: false,
        status: false,
        url: Global.url
    }


    //Ajax petitions
    getArticles = () => {
        axios.get(this.state.url + 'articles')
            .then((res) => {
                this.setState({
                    articles: res.data.articles,
                    status: true
                });
                console.log(this.state);
            })
    }

    getLastArticles = () => {
        axios.get(this.state.url + 'articles/last')
            .then((res) => {
                this.setState({
                    articles: res.data.articles,
                    status: true
                });
                console.log(this.state);
            })
    }

    getArticlesBySearch = (searched) => {
        axios.get(this.state.url + 'search-article/' + searched)
            .then((res) => {
                if (res.data.articles) {
                    this.setState({
                        articles: res.data.articles,
                        status: true
                    });
                }
                console.log(this.state);
            })
            .catch((err) => {
                this.setState({
                    articles: [],
                    status: true
                });
            });
    }

    componentWillMount() { /* The recommended upgrade path for most use cases is to move data-fetching into componentDidMount: */
        if (this.props.last) {
            this.setState({
                last: true
            });
        }
    }

    componentDidMount() {
        var search = this.props.search;

        if (this.state.last === true) {
            this.getLastArticles();
        }
        else if (search && search !== null && search !== undefined) {
            this.getArticlesBySearch(search);
        }
        else {
            this.getArticles();
        }
    }


    render() {
        //Apply JS
        if (this.state.articles.length >= 1) {
            var listArticles = this.state.articles.map((article, i) => {
                return (
                    <div key={article._id}>
                        <article className="article-item article-detail">
                            <div className="image-wrap">
                                {article.image ?/* if */ (
                                    <img src={this.state.url + '/get-image/' + article.image} alt={article.title} />
                                ) : /* else */ (
                                        <img src={NotImage} alt={article.title} />
                                    )
                                }
                            </div>
                            <h1>{article.title + ' ' + (i + 1)}</h1>
                            <h4>{article.content}</h4>
                            <span className="date">
                                <Moment locale="es" fromNow>
                                    {article.date}
                                </Moment>
                            </span>
                            <Link to={"blog/article-detail/" + article._id}>Read more</Link>
                        </article>
                    </div>
                );
            })


            return (
                <div id="articles">

                    {/* List of articles */}
                    {listArticles}

                    <div className="clearfix"></div>
                </div>
            );
        } else if (this.state.articles.length === 0 && this.state.status === true) {
            return (
                <div id="articles">
                    {/* List of articles get since api of NodeJs*/}
                    <h1 className="sub-header">No articles were found to show</h1>
                </div>
            );
        } else {
            return (
                <div id="articles-loading">
                    <h2>Loading...</h2>
                    <h4>Please wait</h4>
                </div>
            );
        }
    } //end render()
}

export default Articles;