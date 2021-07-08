import React, { Component } from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';

import API from './api.js';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';

import SignupForm from './SignupForm.js';
import SigninForm from './SigninForm.js';
import UserProfile from './UserProfile.js';
import PeopleList from './PeopleList.js';

const Protected = ({ authenticated, children }) => (
    authenticated ? children : null
);

class App extends Component {
    constructor(props) {
        super(props);

        const access_token = window.localStorage.getItem('access_token');

        this.state = {
            access_token,
            currentUser: null,
            user: null,
            people: [],
            signInForm: {
                email: 'bob@example.com',
                password: '321321',
            },
            signUpForm: {
                displayName: 'Bob Ross',
                email: 'bob1@example.com',
                password: '321321',
            },
            messages: [],
        };

        this.api = API(access_token);
    }

    componentDidUpdate() {
        const { access_token } = this.state;
        window.localStorage.setItem('access_token', access_token);
    }

    componentDidMount() {
        const { access_token } = this.state;
        this.loadCurrentUser();

        // -------------------------
        // Socket.io integration

        const socket = io('http://localhost:3000');
        this.socket = socket;

        socket.on('getMsgs', messages => {
            this.setState({
                messages,
            });
        });

        socket.on('newChatMsg', msg => {
            this.setState({
                messages: [].concat(this.state.messages, msg),
            });
        });
    }

    sendChatMsg(text) {
        const msg = {
            sender: this.state.currentUser.displayName,
            text,
        };

        this.setState({
            messages: [].concat(this.state.messages, msg),
        });

        this.socket.emit('chatMsg', msg);
    }

    onNameUpdate(displayName) {
        const { signUpForm } = this.state;

        const updatedForm = Object.assign({}, signUpForm, { displayName });

        this.setState({
            signUpForm: updatedForm,
        });
    }

    onEmailUpdate(form, email) {
        const oldForm = this.state[form];

        const updatedForm = Object.assign({}, oldForm, { email });

        this.setState({
            [form]: updatedForm,
        });
    }

    onPasswordUpdate(form, password) {
        const oldForm = this.state[form];

        const updatedForm = Object.assign({}, oldForm, { password });

        this.setState({
            [form]: updatedForm,
        });
    }

    onSignUpSubmit() {
        const { signUpForm } = this.state;

        this.api.post({
            endpoint: 'auth/signup',
            body: {
                email: signUpForm.email,
                displayName: signUpForm.displayName,
                password: signUpForm.password,
            },
        })
            .then(({ access_token }) => {
                this.setState({
                    access_token,
                });

                this.setState({
                    currentUser: {
                        displayName: signUpForm.displayName,
                        email: signUpForm.email,
                    },
                    signUpForm: {
                        name: '',
                        email: '',
                        password: '',
                    },
                });

                this.api = API(access_token);

                this.loadCurrentUser();
            })
            .catch(err => console.error(err));
    }

    onSignInSubmit() {
        const {
            signInForm: {
                email,
                password,
            },
        } = this.state;

        this.api.post({
            endpoint: 'auth/login',
            body: {
                email,
                password,
            }
        })
            .then(({ access_token }) => {
                this.setState({
                    access_token,
                });

                this.api = API(access_token);

                this.loadCurrentUser();
            })
            .catch(err => console.error(err));
    }

    loadCurrentUser() {
        this.loadUser({ id: 'me' });
    }

    loadUser({ id }) {
        const userField = id === 'me' ? 'currentUser' : 'user';
        this.setState({
            [userField]: false,
        });
        this.api
            .get({ endpoint: `api/users/${id}` })
            .then(({ _id, email, displayName }) => {
                this.setState({
                    [userField]: {
                        _id,
                        email,
                        displayName,
                    },
                });
            });
    }

    loadPeople() {
        this.api.get({
            endpoint: 'api/users',
        }).then(({ users }) => {
            this.setState({ people: users });
        });
    }

    vote(upOrDown, id) {
        this.api.get({
            endpoint: `api/users/${ id }/vote/${ upOrDown }`,
        });
    }

    voteUp(id) {
        this.vote('up', id);
    }

    voteDown(id) {
        this.vote('down', id);
    }

    render() {
        const {
            currentUser,
            user,
            signUpForm,
            signInForm,
            people,
        } = this.state;

        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/app/signin">Sign in</Link></li>
                        <li><Link to="/app/signup">Sign up</Link></li>
                        <Protected authenticated={ !!currentUser }>
                            <li><Link to="/app/user/me/profile">{ currentUser && currentUser.displayName }</Link></li>
                        </Protected>
                        <Protected authenticated={ !!currentUser }>
                            <li><Link to="/app/people">People</Link></li>
                        </Protected>
                    </ul>
                    <div>
                        <Route path="/app/signup" render={ () => (
                            <SignupForm
                                state={ signUpForm }
                                onNameUpdate={ this.onNameUpdate.bind(this) }
                                onEmailUpdate={ this.onEmailUpdate.bind(this) }
                                onPasswordUpdate={ this.onPasswordUpdate.bind(this) }
                                onSubmit={ this.onSignUpSubmit.bind(this) }
                                />
                        )} />
                        <Route path="/app/signin" render={ () => (
                            <SigninForm
                                state={ signInForm }
                                onEmailUpdate={ this.onEmailUpdate.bind(this) }
                                onPasswordUpdate={ this.onPasswordUpdate.bind(this) }
                                onSubmit={ this.onSignInSubmit.bind(this) }
                                />
                        )} />
                        <Route path="/app/people" render={ () => (
                            <PeopleList
                                people={ people }
                                loadPeople={ this.loadPeople.bind(this) }
                                />
                        )} />
                        <Switch>
                            <Route path="/app/user/me/profile" render={ () => (
                                <UserProfile
                                    user={ currentUser }
                                    messages={ this.state.messages }
                                    onSend={ this.sendChatMsg.bind(this) }
                                />
                            )} />
                            <Route path="/app/user/:id/profile" render={ ({ match }) => (
                                <UserProfile
                                    user={ user }
                                    messages={ this.state.messages }
                                    match={ match }
                                    loadUser={ this.loadUser.bind(this) }
                                    onUp={ this.voteUp.bind(this) }
                                    onDown={ this.voteDown.bind(this) }
                                    onSend={ this.sendChatMsg.bind(this) }
                                    />
                            )} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

const container = document.getElementById('root');

render(
    <App />,
    container
);
