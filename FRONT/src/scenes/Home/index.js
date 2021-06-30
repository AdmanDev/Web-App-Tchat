import './home.css';
import React from 'react';
import Login from 'components/Login';
import Separator from 'components/Separator';
import Button from 'components/Button';
import { FaReact, FaNodeJs, FaGoogle, FaFacebookF, FaGithub, FaDatabase, FaCode } from 'react-icons/fa';
import { SiSocketDotIo } from 'react-icons/si';

const iconSize = 45;

function Home() {
    const openGithubRepo = () => {
        window.open('https://github.com/AdmanDev/Web-App-Tchat');
    }

    return (
        <div id='home_container'>
            <div id='home_app_desc_container'>
                <p id='home_desc_title'>Tchat - Discutez et échangez !</p>
                <hr />
                <Separator text='Technologies' />
                <div className='home_line_info'>
                    <div className='home_card_info'>
                        <FaReact size={iconSize} />
                        <p>ReactJs</p>
                    </div>
                    <div className='home_card_info'>
                        <FaNodeJs size={iconSize} />
                        <p>NodeJs</p>
                    </div>
                    <div className='home_card_info'>
                        <SiSocketDotIo size={iconSize} />
                        <p>Socket.io</p>
                    </div>
                </div>
                <br />
                <Separator text='Méthodes de connexion' />
                <div className='home_line_info'>
                    <div className='home_card_info'>
                        <FaGoogle size={iconSize} />
                        <p>Google</p>
                    </div>
                    <div className='home_card_info'>
                        <FaFacebookF size={iconSize} />
                        <p>Facebook</p>
                    </div>
                    <div className='home_card_info'>
                        <FaGithub size={iconSize} />
                        <p>GitHub</p>
                    </div>
                </div>
                <p>
                    Après connexion, l'utilisateur pourra créer un tchat ou en rejoindre un, grâce à un code généré aléatoirement.
                </p>
                <Separator text='Confidentialité' />
                <div className='home_line_info'>
                    <div className='home_card_info'>
                        <FaDatabase size={iconSize} />
                        <p>No database</p>
                    </div>
                </div>
                <p>
                    Fonctionne sans base de données.
                    Ni les messages ni les données utilisateurs ni aucune information n’est sauvegardée.
                </p>
                <Separator text='Open source' />
                <div className='home_line_info'>
                    <div className='home_card_info'>
                        <FaCode size={iconSize} />
                    </div>
                </div>
                <Button
                    onClick={openGithubRepo}
                    style={{ width: 'fit-content', margin: '10px auto' }}
                >
                    Code source disponible sur GitHub
                </Button>
            </div>
            <Login />
        </div>
    );
}

export default Home;
