import React from 'react';
import PropTypes from 'prop-types'
import FileView from '../FileView';

function File({ file }) {
    if (!file) {
        return <></>;
    }

    if (file.type.includes('image')) {
        const img = Buffer.from(file.data)?.toString('base64')
        return (
            <img
                className='msg_item_image_sent'
                src={`data:${file.type};base64,${img}`}
                alt={file.name}
            />
        )
    }
    else {
        return (
            <FileView
                file={file}
                downloadMode={true}
            />
        )
    }

    return <></>;
}

function Message({ item }) {
    return (
        <div className='msg_item_container'>
            <img src={item.user.picture} alt='user profile' />
            <div>
                <p
                    className="msg_item_user_name"
                    style={{ color: item.user.color }}
                >
                    {item.user.name}
                </p>
                <p className="msg_item_text">{item.msg.content}</p>
                <File file={item.msg.file} />
            </div>
        </div>
    );
}

Message.propTypes = {
    item: PropTypes.shape({
        user: PropTypes.shape({
            name: PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired
        }),
        msg: PropTypes.shape({
            content: PropTypes.string.isRequired,
            file: PropTypes.shape({
                type: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                data: PropTypes.object.isRequired
            })
        }).isRequired
    }).isRequired
}

export default Message;