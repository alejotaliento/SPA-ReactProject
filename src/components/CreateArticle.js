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

//validicacion de formularios y alertas

class CreateArticle extends Component {

    state = {
        article: {},
        status: false,
        url: Global.url,
        selectedFile: null
    };

    constructor(props) {
        super(props);
        // Se carga el objeto para validar el formulario
        this.validator = new SimpleReactValidator({
            className: 'text-danger',
            messages: {
                required: "This field is required.",
            }
        })
    }

    //Fields form
    titleRef = React.createRef();
    contentRef = React.createRef();

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
            }
        });

        //Message of validation
        this.validator.showMessages();
    }

    //Ajax petitions
    saveArticle = (e) => {
        e.preventDefault();

        //Complet full state with form
        this.changeState();

        if (this.validator.allValid()) {
            //Ajax petition for post() to save article
            axios.post(this.state.url + 'save', this.state.article)
                .then((res) => {

                    if (res.data.article) {
                        this.setState({
                            article: res.data.article
                        });

                        //alert
                        swal(
                            'Article created',
                            'The article has been successfully created',
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
                                'Article created',
                                'The article created has not image',
                                'info'
                            );
                        }
                    }
                });
        } else {
            this.validator.showMessages();
            
             //alert
             swal(
                'Article not created',
                'The article has a error to created',
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

        return (
            <div id="create-article">
                <div className="center">
                    <section id="content">
                        <h1 className="sub-header">Create article</h1>

                        <form className="mid-form" onSubmit={this.saveArticle}>

                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" ref={this.titleRef} onChange={this.changeState} />
                            </div>

                            {/* VALIDATION */}
                            {this.validator.message('title', this.state.article.title, 'required|alpha_space')}

                            <div className="form-group">
                                <label htmlFor="content">Content</label>
                                <textarea name="content" ref={this.contentRef} onChange={this.changeState} />
                            </div>

                            {/* VALIDATION */}
                            {this.validator.message('content', this.state.article.content, 'required|alpha_num_space')}

                            <div className="form-group">
                                <label htmlFor="file0">Image</label>
                                <input type="file" name="file0" onChange={this.fileChange} />
                            </div>

                            <input type="submit" value="Save" className="btn-success" />

                        </form>


                    </section>
                </div>

                <Sidebar />
            </div>
        );
    }
}

export default CreateArticle;