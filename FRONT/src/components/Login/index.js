import './login.css';
import React, { useContext } from 'react';
import JoinCreate from '../JoinCreate';
import LoginService from './components/LoginService';
import LocalUserProvider from 'components/Provider/LocalUserProvider';

function Login(props) {
    const user = useContext(LocalUserProvider);

    return (
        <div id='login_container'>
            <p>Connectez-vous 😉</p>
            <hr />
            {user ? <JoinCreate /> : <LoginService />}
        </div>
    );
}

export default Login;