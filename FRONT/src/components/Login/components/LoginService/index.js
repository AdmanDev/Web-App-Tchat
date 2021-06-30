import React, { useContext, useEffect } from 'react'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import LoginGithub from 'react-login-github';
import SocketProvider from 'components/Provider/SocketProvider';
import { login } from 'services/socketEmitEvent';
import Cookies from 'universal-cookie';
import { AiFillGithub } from 'react-icons/ai';

const cookies = new Cookies();

function LoginService() {
    const socket = useContext(SocketProvider);

    useEffect(() => {
        if (socket) {
            const session = cookies.get('session-info');
            if (session) {
                login(socket, session.token, session.service);
            }
        }
    }, [socket])

    const onGoogleResponse = response => {
        login(socket, response.tokenId, 'Google');
    }

    const onFacebookResponse = response => {
        login(socket, response.accessToken, 'Facebook');
    }

    const onGithubResponse = response => {
        login(socket, response.code, 'Github');
    }

    return (
        <div className='login_methods_container'>
            <GoogleLogin
                style={{ marginBottom: 10 }}
                clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_API_KEY}
                buttonText='Se connecter avec Google'
                onSuccess={onGoogleResponse}
                onFailure={onGoogleResponse}
                cookiePolicy='single_host_origin'
            />

            <FacebookLogin
                buttonStyle={{ fontSize: 14 }}
                appId={process.env.REACT_APP_FACABOOK_LOGIN_CLIENT_API_KEY}
                autoLoad={false}
                fields='name,picture'
                language='fr_FR'
                textButton='Continuer avec Facebook'
                size='small'
                callback={onFacebookResponse}
            />

            <LoginGithub
                className='login_github_btn'
                clientId={process.env.REACT_APP_GITHUB_LOGIN_CLIENT_API_KEY}
                scope='read:user'
                onSuccess={onGithubResponse}
                onFailure={onGithubResponse}
            >
                <AiFillGithub size={24} />
                Se connecter avec GitHub
            </LoginGithub>
        </div>
    )
}

export default LoginService;
