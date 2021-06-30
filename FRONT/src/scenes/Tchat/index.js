import './tchat.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MessagesContainer from './components/MessagesContainer';

function Tchat(props) {
    return (
        <div id='tchat_container'>
            <Header />
            <MessagesContainer />
            <Footer />
        </div>
    );
}

export default Tchat;