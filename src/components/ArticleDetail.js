import React, { Component } from 'react';
import axios from 'axios';
import { Global } from '../Global';
import Moment from 'react-moment';

//import images/logos
import NotImage from '../assets/images/image-not-available.jpg';

//alert
import swal from 'sweetalert';

//import components
import Sidebar from './Sidebar';
import { Link, Redirect } from 'react-router-dom';


class ArticleDetail extends Component {

    state = {
        article: null,
        status: String,
        url: Global.url
    };

    //Ajax petitions
    getArticle = () => {
        let id = this.props.match.params.id; // get id article of the url

        axios.get(this.state.url + 'article/' + id)
            .then((res) => {
                this.setState({
                    article: res.data.article,
                    status: 'success'
                });
                console.log(this.state);
            })
            .catch((err) => {
                this.setState({
                    status: 'success'
                });
            });
    }

    componentWillMount() {
        this.getArticle();
    }

    deleteArticle = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this article!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(this.state.url + 'article/' + id)
                        .then((res) => {
                            this.setState({
                                article: res.data.article,
                                status: 'deleted'
                            });
                        });
                    swal("Poof! Your article file has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your article file is safe!");
                }
            });
    }

    render() {
        var article = this.state.article;

        if (this.state.status === 'deleted') {
            return <Redirect to="/blog" />
        }

        return (
            <div id="article-detail">
                <div className="center">
                    <section id="content">

                        {article && /* IF */
                            <article className="article-item article-detail">
                                <div className="image-wrap">
                                    {article.image ?/* if */ (
                                        <img src={this.state.url + '/get-image/' + article.image} alt={article.title} />
                                    ) : /* else */ (
                                            <img src={NotImage} alt={article.title} />
                                        )
                                    }
                                </div>

                                <h1 className="sub-header">{article.title}</h1>
                                <h4>{article.content}</h4>
                                <span className="date">
                                    <Moment locale='es' format="YYYY/MM/DD">
                                        {article.date}
                                    </Moment>
                                </span>

                            </article>
                        }{!article && this.state.status === true && /* ELSE IF */
                            <div id="article-detail">
                                <h2 className="sub-header">The article not exist</h2>
                                <p>Please try again later</p>
                            </div>
                        }

                        {this.state.status === false &&/* ELSE */
                            < div id="article-detail">
                                <h2 className="sub-header">Loading...</h2>
                                <p>Wait a seconds</p>
                            </div>
                        }

                        {/* <!-- LIMIPIAR FLOTADOS --> */}
                        <div className="clearfix"></div>

                        {article &&
                            <div id="article-detail">
                                <button onClick={
                                    () => {
                                        this.deleteArticle(article._id);
                                    }
                                }
                                    className="btn btn-danger">Delete</button>
                                <Link to={'/blog/edit-article/' + article._id} className="btn btn-warning">Edit</Link>
                            </div>
                        }

                    </section>

                    <Sidebar />
                </div>
            </div >
        );
    }
}

export default ArticleDetail;