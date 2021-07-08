import React, { Component } from 'react';

class SigninForm extends Component {
    render() {

        const {
            state: {
                email,
                password,
            },
            onEmailUpdate,
            onPasswordUpdate,
            onSubmit,
        } = this.props;

        const FORM_NAME = 'signInForm';

        return (
            <div>
                <h2>I'm sign in form</h2>
                <div>
                    <input
                        type="email"
                        onChange={ e => onEmailUpdate(FORM_NAME, e.target.value) }
                        value={ email }
                        placeholder="Your email" />
                </div>
                <div>
                    <input
                        type="password"
                        onChange={ e => onPasswordUpdate(FORM_NAME, e.target.value) }
                        value={ password }
                        placeholder="Your password" />
                </div>
                <div>
                    <button type="button" onClick={ () => {
                        onSubmit();
                    }}>Continue</button>
                </div>

            </div>
        );
    }
}

export default SigninForm;
