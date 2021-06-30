import './menu.css';
import user_profile_img from 'assets/user_profile.png'
import tchat_icon_img from 'assets/tchat_icon.png'
import React, { useContext } from 'react';
import DropdownMenu from 'components/DropdownMenu';
import DropdownItem from 'components/DropdownMenu/components/DropdownItem';
import LocalUserProvider from 'components/Provider/LocalUserProvider';
import LoggedMenu from './components/LoggedMenu';
import LoginService from 'components/Login/components/LoginService';

function Menu() {
    const user = useContext(LocalUserProvider);
    return (
        <div id='menu_container'>
            <img src={tchat_icon_img} alt='logo' id='menu_icon' />
            <div id='menu_right'>
                {
                    user ? <LoggedMenu user={user} /> :
                        <DropdownMenu
                            title={<DropdownItem icon={user_profile_img} text='Se connecter' />}
                        >
                            <LoginService />
                        </DropdownMenu>
                }
            </div>
        </div>
    )
}

export default Menu;
