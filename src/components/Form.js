import React, { Component } from 'react';

//import components
import Sidebar from './Sidebar';

class Form extends Component {

    // Form fields
    nameRef = React.createRef();
    lastnameRef = React.createRef();
    bioRef = React.createRef();
    genderMenRef = React.createRef();
    genderWomanRef = React.createRef();
    genderOtherRef = React.createRef();

    state = {
        user: {}
    };

    sendForm = (event) => {
        event.preventDefault(); // evita que recargue la pantalla por defecto al enviar el form

        let gender = '';

        if (this.genderMenRef.current.checked) {
            gender = this.genderMenRef.current.value;

        } else if (this.genderWomanRef.current.checked) {
            gender = this.genderWomanRef.current.value;

        } else {
            gender = this.genderOtherRef.current.value;
        }

        let user = {
            name: this.nameRef.current.value,
            lastname: this.lastnameRef.current.value,
            bio: this.bioRef.current.value,
            gender: gender
        };

        this.setState({
            user: user
        });

        console.log("Send form");
        console.log(user);
        //console.log(this.genderMenRef.current.value + " " + this.genderWomanRef.current.value + " " + this.genderOtherRef.current.value);
    }

    render() {
        var isEnabled = false;

        return (
            <div id="form">
                <div className="center">
                    <div id="content">
                        <h1 className="sub-header">Form</h1>

                        {/* Show data of form */}
                        {this.state.user.name && this.state.user.lastname && this.state.user.bio && this.state.user.gender ?/*IF*/(
                            <div id="user-data">
                                <p>Name: <strong>{this.state.user.name}</strong></p>
                                <p>Lastname: <strong>{this.state.user.lastname}</strong></p>
                                <p>Bio: <strong>{this.state.user.bio}</strong></p>
                                <p>Gender: <strong>{this.state.user.gender}</strong></p>
                                {isEnabled = true}
                            </div>
                        ) :/*ELSE*/ (
                                <p>Faltan datos por completar</p>
                            )
                        }

                        {/* Create a form */}
                        <form className="mid-form" onSubmit={this.sendForm} onChange={this.sendForm}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" ref={this.nameRef} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastname">Lastname</label>
                                <input type="text" name="lastname" ref={this.lastnameRef} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="bio">Biography</label>
                                <textarea name="bio" ref={this.bioRef}></textarea>
                            </div>

                            <div className="form-group radio-buttons">
                                <input type="radio" name="gender" value="Men" ref={this.genderMenRef} /> Men
                                <input type="radio" name="gender" value="Woman" ref={this.genderWomanRef} /> Woman
                                <input type="radio" name="gender" value="Other" ref={this.genderOtherRef} /> Other
                            </div>

                            <div className="clearfix"></div>

                            <input type="submit" className="btn-success" value="Send" disabled={!isEnabled} />
                        </form>

                    </div> {/* End _content */}

                    <Sidebar
                        changes={false}
                    />
                </div> {/* End .center */}
            </div> /* End _form */
        );
    }
}

export default Form;