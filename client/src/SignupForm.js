import React, { Component } from 'react';
import { withRouter } from 'react-router';

class SignupForm extends Component {
    render() {
        const {
            state: {
                displayName,
                email,
                password,
            },
            onNameUpdate,
            onEmailUpdate,
            onPasswordUpdate,
            onSubmit,

            history,
        } = this.props;

        const FORM_NAME = 'signUpForm';

        return (
            <div>
                <h2>I'm sign up form</h2>

                <div>
                    <input
                        type="text"
                        onChange={ e => onNameUpdate(e.target.value) }
                        value={ displayName }
                        placeholder="Your name" />
                </div>
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
                        history.push('/app/user/profile');
                    }}>Continue</button>
                </div>

            </div>
        );
    }
}

const SignupFormWithRouter = withRouter(SignupForm);

export default SignupFormWithRouter;
