import './separator.css';
import React from 'react';
import PropTypes from 'prop-types';

function Separator({ text }) {
    return (
        <div className='separator_container'>
            <p>{text}</p>
            <hr />
        </div>
    );
}

Separator.propTypes = {
    text: PropTypes.string
};

export default Separator;
