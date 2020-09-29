import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Global } from '../Global';

//import form validator
import SimpleReactValidator from 'simple-react-validator';

//import alerts
import swal from 'sweetalert';

//import components
import Sidebar from './Sidebar';

//import images/logos
import NotImage from '../assets/images/image-not-available.jpg';


class EditArticle extends Component {

    state = {
        article: {},
        status: false,
        url: Global.url,
        selectedFile: null
    };

    articleId = null;

    constructor(props) {
        super(props);

        this.articleId = this.props.match.params.id;
        this.getArticle(this.articleId);
        // Se carga el objeto para validar el formulario
        this.validator = new SimpleReactValidator({
            className: 'text-danger',
            messages: {
                required: "This field is required.",
            }
        });
    }

    //Fields form
    titleRef = React.createRef();
    contentRef = React.createRef();

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        });

        //Message of validation
        this.validator.showMessages();
    }

    //Ajax petitions
    getArticle = (id) => {
        axios.get(this.state.url + 'article/' + id)
            .then((res) => {
                this.setState({
                    article: res.data.article
                });
                console.log(this.state.article);
            });
    }

    updateArticle = (e) => {
        e.preventDefault();

        //Complet full state with form
        this.changeState();

        if (this.validator.allValid()) {
            //Ajax petition for post() to save article
            axios.put(this.state.url + 'article/' + this.articleId, this.state.article)
                .then((res) => {

                    if (res.data.article) {
                        this.setState({
                            article: res.data.article
                        });

                        //alert
                        swal(
                            'Article edited',
                            'The article has been successfully edited',
                            'success'
                        );

                        //upload image
                        if (this.state.selectedFile !== null) {

                            //Get id of saved article
                            let articleId = this.state.article._id;

                            //Create form data and add script
                            const formData = new FormData();

                            formData.append(
                                'file0', //name script
                                this.state.selectedFile, //script upload
                                this.state.selectedFile.name // name script
                            );

                            //Ajax petition
                            axios.post(this.state.url + '/upload-image/' + articleId, formData)
                                .then((res) => {
                                    if (res.data.article) {
                                        this.setState({
                                            article: res.data.article,
                                            status: true
                                        });
                                    }
                                    console.log(this.state);
                                });

                        } else {
                            this.setState({
                                status: true
                            });

                            //alert
                            swal(
                                'Article edited',
                                'The article edited has not image',
                                'info'
                            );
                        }
                    }
                });
        } else {
            this.validator.showMessages();

            //alert
            swal(
                'Article not edited',
                'The article has a error to edited',
                'error'
            );
        }

    }

    fileChange = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        });
    }

    render() {
        if (this.state.status === true) {
            return <Redirect to="/blog" />;
        }

        var article = this.state.article;
        return (
            <div id="edit-article">
                <div className="center">
                    <section id="content">
                        <h1 className="sub-header">Edit article</h1>

                        {this.state.article.title &&
                            <form className="mid-form" onSubmit={this.updateArticle}>

                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" name="title" defaultValue={article.title} ref={this.titleRef} onChange={this.changeState} />
                                </div>

                                {/* VALIDATION */}
                                {this.validator.message('title', this.state.article.title, 'required|alpha_space')}

                                <div className="form-group">
                                    <label htmlFor="content">Content</label>
                                    <textarea name="content" defaultValue={article.content} ref={this.contentRef} onChange={this.changeState} />
                                </div>

                                {/* VALIDATION */}
                                {this.validator.message('content', this.state.article.content, 'required|alpha_num_space')}

                                <div className="article-item article-edit">
                                    <div className="image-wrap">
                                        {article.image ?/* if */ (
                                            <img src={this.state.url + '/get-image/' + article.image} alt={article.title} />
                                        ) : /* else */ (
                                                <img src={NotImage} alt={article.title} />
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="file0">Image</label>
                                    <input type="file" name="file0" onChange={this.fileChange} />
                                </div>

                                <input type="submit" value="Save" className="btn-success" />

                            </form>
                        }

                        {!this.state.article.title &&
                            < div id="article-edit">
                                <h2>Loading...</h2>
                                <p>Wait a seconds</p>
                            </div>

                        }

                    </section>
                </div>

                <Sidebar />
            </div>
        );
    }
}

export default EditArticle;