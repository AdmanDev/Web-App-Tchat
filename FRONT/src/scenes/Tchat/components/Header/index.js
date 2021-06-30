import './header.css'
import React, { useContext, useState } from 'react';
import { HiUserGroup } from 'react-icons/hi';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { TiGroupOutline } from 'react-icons/ti';
import { leaveTchat } from 'services/socketEmitEvent'
import SocketProvider from 'components/Provider/SocketProvider';
import UsersLists from './components/UsersList';

const iconSize = 40;

function Header(props) {
    const socket = useContext(SocketProvider);
    const [showUsers, setShowUsers] = useState(false);

    const leave_Tchat = () => {
        leaveTchat(socket);
    }

    const toggleShowUsers = () => {
        setShowUsers(showUsers => !showUsers);
    }

    return (
        <div id='header_container'>
            <HiUserGroup color='var(--tertiary)' size={iconSize} />
            <p id='tchat_title'>Tchat - Discutez et échangez !</p>
            <div id='header_right_container'>
                <TiGroupOutline
                    className='icon_btn'
                    size={iconSize}
                    color='var(--tertiary)'
                    onClick={toggleShowUsers}
                />
                <RiLogoutCircleLine
                    className='icon_btn'
                    color='var(--tertiary)'
                    size={iconSize}
                    onClick={leave_Tchat}
                />
                {showUsers && <UsersLists />}
            </div>
        </div>
    );
}

export default Header;