import React, { useContext } from 'react';
import LocalUserProvider from 'components/Provider/LocalUserProvider';
import { alertRef, alertType } from 'components/Alert';
import Button from 'components/Button';

function CopyTchatCodeButton() {
    const localUser = useContext(LocalUserProvider);

    const copyTchatCode = () => {
        navigator.clipboard.writeText(localUser.tchatCode);
        alertRef.current.showAlert('Code copié !', alertType.INFO, 4000);
    }

    return (
        <Button onClick={copyTchatCode} >Copier le code</Button>
    )
}

export default CopyTchatCodeButton;
