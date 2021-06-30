import './messagesContainer.css';
import React, { useState, useContext, useEffect } from 'react';
import Message from './Message';
import LocalUserProvider from 'components/Provider/LocalUserProvider';
import SocketProvider from 'components/Provider/SocketProvider';
import { onReceiveMessage } from 'services/socketEventsSetup';
import CopyTchatCodeButton from 'components/CopyTchatCodeButton';

const mc_ref = React.createRef();

function MessagesContainer(props) {
    const [messages, setMessages] = useState([]);
    const user = useContext(LocalUserProvider);
    const socket = useContext(SocketProvider);

    useEffect(() => {
        if (socket) {
            onReceiveMessage(updateMessages);
        }
    }, [socket]);

    useEffect(() => {
        mc_ref.current.scrollTo(0, mc_ref.current.scrollHeight);
    }, [messages]);

    const updateMessages = (newMsg) => {
        setMessages(messages => [...messages, newMsg]);
    }

    return (
        <div id='mc_container' ref={mc_ref}>
            {
                messages.length <= 0 &&
                <>
                    <p className='mc_inviteTchat'>
                        {`Invitez des personnes à rejoindre le tchat. Votre code : ${user.tchatCode}`}
                    </p>
                    <CopyTchatCodeButton />
                </>
            }
            {messages.map((item, index) => <Message key={`msg ${index}`} item={item} />)}
        </div>
    );
}

export default MessagesContainer;