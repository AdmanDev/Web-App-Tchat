import './footer.css';
import React, { useContext, useState } from 'react';
import { ImAttachment } from 'react-icons/im';
import { HiEmojiHappy } from 'react-icons/hi';
import { sendMessage } from 'services/socketEmitEvent';
import SocketProvider from 'components/Provider/SocketProvider';
import EmojiPicker from 'emoji-picker-react';
import FileView from '../FileView';
import { alertRef } from 'components/Alert';

const inputMsgRef = React.createRef();
const inputFileRef = React.createRef();

const maxAttachmentSize = 100000;

function Footer(props) {
    const initialMsg = {
        content: '',
        file: undefined
    };
    const [msg, setMsg] = useState(initialMsg);
    const [showEmoji, setShowEmoji] = useState(false);
    const socket = useContext(SocketProvider);

    const onMsgChange = (e) => {
        setMsg(msg => ({
            ...msg,
            content: e.target.value
        }));
    }

    const sendMsg = () => {
        if (msg?.content || msg?.file) {
            sendMessage(socket, msg);
            setMsg(initialMsg);
        }
    }

    const onEnterKeyPress = (keyInfo) => {
        if (keyInfo.key === 'Enter') {
            sendMsg();
        }
    }

    const toggleShowEmoji = () => {
        setShowEmoji(showEmoji => !showEmoji);
    }

    const onEmogiChoosen = (event, emoji) => {
        setMsg(msg => ({
            ...msg,
            content: msg.content + emoji.emoji
        }));
        toggleShowEmoji();
        inputMsgRef.current.focus();
    }

    const onInputFileClick = () => {
        inputFileRef.current.click();
    }

    const onInputFileChange = (event) => {
        event.stopPropagation();
        event.preventDefault();

        const file = event.target.files[0];
        event.target.value = null;
        if (!file || file.size > maxAttachmentSize || file.type.includes('x-')) {
            alertRef.current.showAlert(`Les fichiers de plus ${maxAttachmentSize / 1000} KO ne sont pas autorisés !`);
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const bytes = new Uint8Array(e.target.result);
            setMsg(msg => ({
                ...msg,
                file: {
                    type: file.type,
                    name: file.name,
                    data: bytes
                }
            }));
        }
        reader.readAsArrayBuffer(file);
    }

    const onRemoveFile = () => {
        setMsg(msg => ({
            ...msg,
            file: initialMsg.file
        }));
    }

    return (
        <div id='footer_container'>
            {
                msg?.file &&
                <FileView
                    file={msg.file}
                    onRemove={onRemoveFile}
                />
            }
            <div className='input_container'>
                <div className='footer_emoji_container'>
                    {
                        showEmoji &&
                        <EmojiPicker
                            pickerStyle={{
                                position: 'absolute',
                                top: '-300px',
                                left: '25px',
                                zIndex: 2,
                            }}
                            native={true}
                            onEmojiClick={onEmogiChoosen}
                        />
                    }
                    <HiEmojiHappy className='footer_btn_action' size={24} onClick={toggleShowEmoji} />
                </div>
                <input
                    ref={inputMsgRef}
                    type='text'
                    placeholder="Saisissez un message..."
                    value={msg.content}
                    onChange={onMsgChange}
                    onKeyPress={onEnterKeyPress}
                />
                <div onClick={onInputFileClick}>
                    <ImAttachment className='footer_btn_action' size={20} />
                    <input
                        type='file'
                        id='file'
                        ref={inputFileRef}
                        style={{ display: 'none' }}
                        onChange={onInputFileChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default Footer;