import React from 'react';
import PropTypes from 'prop-types';

function UserItem({ item }) {
    const { name, picture, color } = item;

    return (
        <div className='userList_item'>
            <img src={picture} alt={name} />
            <p style={{ color }}>{name}</p>
        </div>
    )
}

UserItem.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
    }).isRequired
}

export default UserItem;
