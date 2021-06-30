import React from 'react';
import DropdownMenu from 'components/DropdownMenu';
import DropdownItem from 'components/DropdownMenu/components/DropdownItem';
import { RiLogoutCircleLine } from 'react-icons/ri';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function LoggedMenu({ user }) {
    const logout = () => {
        cookies.remove('session-info');
        window.location.reload(false);
    }

    return (
        <DropdownMenu
            title={<DropdownItem icon={user.picture} text={user.name} />}
        >
            <DropdownItem
                icon={<RiLogoutCircleLine size={24} />}
                text='Déconnexion'
                onClick={logout}
            />
        </DropdownMenu>
    );
}

LoggedMenu.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired
    }).isRequired
}

export default LoggedMenu;
