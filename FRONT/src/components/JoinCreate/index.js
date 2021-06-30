import React, { useContext } from 'react';
import Button from 'components/Button';
import Separator from 'components/Separator';
import { createTchat, joinTchat } from 'services/socketEmitEvent';
import SocketProvider from 'components/Provider/SocketProvider';

var tchatCode = '';

function JoinCreate(props) {
    const socket = useContext(SocketProvider);

    const onTchatCodeChange = event => {
        tchatCode = event.target.value;
    }

    const onCreate = () => {
        createTchat(socket);
    }

    const onJoin = () => {
        if (tchatCode) {
            joinTchat(socket, tchatCode);
        }
    }

    return (
        <>
            <div className='input_container'>
                <input
                    type='text'
                    placeholder='Code du tchat...'
                    onChange={onTchatCodeChange}
                />
            </div>
            <Button onClick={onJoin}>Rejoindre un tchat</Button>
            <Separator text='OU' />
            <Button onClick={onCreate}>Créer un tchat</Button>
        </>
    )
}

export default JoinCreate;
