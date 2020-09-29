import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// import components
import Test from './components/Test';
import MiComponente from './components/MiComponente';
import Movies from './components/Movies';
import Error from './components/Error';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Blog from './components/Blog';
import Form from './components/Form';
//import Articles from './components/Articles';
import ArticleDetail from './components/ArticleDetail';
import Search from './components/Search';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';

class Router extends Component {
    render() {
        return (
            <BrowserRouter>

                <Header />

                {/* CONFIG RUTES AND PAGES */}
                <Switch>

                    {/* Statics Routes */}
                    <Route exact={true} path="/" component={Home} />
                    <Route path="/home" component={Home} />
                    <Route exact={true} path="/blog" component={Blog} />
                    <Route path="/search-article/:search" component={Search} />
                    <Route exact={true} path="/blog/article-detail/:id" component={ArticleDetail} />
                    <Route path="/form" component={Form} />
                    <Route exact={true} path="/blog/create-article" component={CreateArticle} />
                    <Route exact={true} path="/blog/edit-article/:id" component={EditArticle} />
                    <Route path="/movies" component={Movies} />
                    <Route path="/test" component={Test} />


                    {/* Dynamic Routes */}
                    <Route path="/one-page" render={() => ( //render() have a "()" not "{}"
                        <React.Fragment>
                            <h1 className="sub-header">Hello wolrd since ONE PAGE</h1>
                            <MiComponente greeting="Hello i'm greenting the attribute of the MiComponete" />
                        </React.Fragment>
                    )} />

                    <Route exact={true} path="/redirect/:search" render={
                        (props) => {
                            let search = props.match.params.search;
                            return (
                                <Redirect to={'/search-article/' + search} />
                            );
                        }
                    } />



                    {/* Get params of the URL and opcitonal params */}
                    <Route path="/test/:name/:lastname?" render={(props) => {
                        // Apply js
                        var name = props.match.params.name;
                        var lastname = props.match.params.lastname;

                        return (
                            <React.Fragment>
                                <h1 className="sub-header">Test page</h1>
                                <h2>
                                    {name && !lastname ? /*if*/(
                                        <span>{name}</span>
                                    ) : /*else*/ (
                                            <span>{name + ' ' + lastname}</span>
                                        )
                                    }
                                </h2>
                            </React.Fragment>
                        );
                    }} />

                    <Route component={Error} /> {/* Route when the page doesn't exist*/}
                </Switch>

                {/* LIMIPIAR FLOTADOS */}
                <div className="clearfix"></div>
                <Footer />
            </BrowserRouter>
        );
    }
}

export default Router;