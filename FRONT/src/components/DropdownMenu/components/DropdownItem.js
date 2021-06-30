import React from 'react';
import PropTypes from 'prop-types';

function DropdownItem({ icon, text, onClick }) {
    var iconElement;
    if (typeof (icon) == 'string') {
        iconElement = <img src={icon} alt={text} className='dpm_item_icon' />
    }
    else {
        iconElement = icon;
    }

    return (
        <div className='dpm_item' onClick={onClick}>
            {iconElement}
            <p>{text}</p>
        </div>
    );
}

DropdownItem.propTypes = {
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

export default DropdownItem;

