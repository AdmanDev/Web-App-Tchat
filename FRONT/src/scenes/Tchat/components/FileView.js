import React from 'react';
import PropTypes from 'prop-types'
import { AiFillFile, AiOutlineClose, AiOutlineDownload } from 'react-icons/ai';

const actionButtonStyle = {
    className: 'icon_btn',
    size: 20,
    style: { marginLeft: '10px' }
}

function saveByteArray(reportName, byte, type) {
    var blob = new Blob([byte], { type });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
};

function FileView({ file, downloadMode, onRemove }) {
    const downloadFile = () => {
        var buffer = Buffer.from(file.data, 'base64');
        saveByteArray(file.name, buffer, file.type);
    }

    return (
        <div className='footer_file_container'>
            <AiFillFile size={24} />
            <p>{file.name}</p>
            {
                !downloadMode ?
                    <AiOutlineClose
                        {...actionButtonStyle}
                        onClick={onRemove}
                    /> :
                    <AiOutlineDownload
                        {...actionButtonStyle}
                        onClick={downloadFile}
                    />
            }
        </div>
    )
}

FileView.propTypes = {
    file: PropTypes.shape({
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired
    }).isRequired,
    downloadMode: PropTypes.bool,
    onRemove: PropTypes.func
};

FileView.defaultProps = {
    downloadMode: false,
};

export default FileView;
