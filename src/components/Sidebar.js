import React, { Component } from 'react';
import { Redirect, Link} from 'react-router-dom';

class Sidebar extends Component {

    searchRef = React.createRef();

    state = {
        search: String,
        redirect: false
    };

    redirectToSearch = (e) => {
        e.preventDefault(); // previene que recargue la pagina

        this.setState({
            search: this.searchRef.current.value,
            redirect: true
        });
    }


    render() {
        //buscador
        if (this.state.redirect) {
            return (
                <Redirect to={'/redirect/' + this.state.search} />
            );
        }

        return (
            <div>
                {/* aside etiqueta para los sidebar (barra lateral) */}
                <aside id="sidebar">

                    {/* ITEM 1 */}
                    {this.props.changes === true &&
                        <div id="nav-blog" className="sidebar-item">
                            <h3>Puedes hacer esto</h3>
                            <Link to={"blog/create-article"} className="btn btn-success">Crear articulo</Link>
                        </div>
                    }

                    {/* ITEM 2 */}
                    <div id="search" className="sidebar-item">
                        <h3>Buscador</h3>
                        <p>Encuentra el articulo que buscas</p>
                        <form onSubmit={this.redirectToSearch}>
                            <input type="text" name="search" ref={this.searchRef} />
                            <input type="submit" name="submit" className="btn" value="Buscar" />
                        </form>
                    </div>
                </aside>

                {/* LIMIPIAR FLOTADOS */}
                <div className="clearfix"></div>
            </div>
        );
    }
}

export default Sidebar;