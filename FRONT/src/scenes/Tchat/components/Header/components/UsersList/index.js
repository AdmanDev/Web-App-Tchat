import './userList.css';
import React, { useContext } from 'react';
import UserItem from './UserItem';
import CopyTchatCodeButton from 'components/CopyTchatCodeButton';
import UsersListProvider from 'components/Provider/UsersListProvider';

function UsersLists() {
    const usersList = useContext(UsersListProvider);

    return (
        <div id='userList_container'>
            <p>Participants :</p>
            <hr />
            <div id='userList_list_container'>
                {
                    usersList.map((item, index) => (
                        <UserItem item={item} key={`user ${index}`} />
                    ))
                }
            </div>
            <p>Inviter des personnes :</p>
            <hr />
            <CopyTchatCodeButton />
        </div>
    );
}

export default UsersLists;
