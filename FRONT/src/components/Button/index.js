import './button.css';
import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, style, onClick }) {
    return (
        <div
            style={style}
            className='btn_container'
            onClick={onClick}
        >
            <p>{children}</p>
        </div>
    )
}

Button.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    style: PropTypes.object,
    onClick: PropTypes.func
}

export default Button;
