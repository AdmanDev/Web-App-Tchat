import { useEffect, useState } from 'react';
import SocketService from "services/SocketService";
import SocketProvider from 'components/Provider/SocketProvider';
import Home from 'scenes/Home';
import Tchat from "../Tchat";
import LocalUserProvider from 'components/Provider/LocalUserProvider';
import { setSocketEvents } from 'services/socketEventsSetup';
import Menu from 'components/Menu';
import Alert, { alertRef } from 'components/Alert';
import UsersListProvider from 'components/Provider/UsersListProvider';

function App() {
  const [socket, setSocket] = useState(null);
  const [localUser, setLocalUser] = useState(null);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    if (!socket) {
      setSocket(new SocketService());
    }
    else {
      socket.on('connect', () => console.log('connected'));
      setSocketEvents(socket, setLocalUser, setUsersList);
    }

    return function cleanup() {
      if (socket) {
        socket.disconnect();
      }
    }
  }, [socket]);

  return (
    <SocketProvider.Provider value={socket}>
      <LocalUserProvider.Provider value={localUser}>
        <UsersListProvider.Provider value={usersList}>
          <Menu />
          {localUser?.tchatCode ? <Tchat /> : <Home />}
          <Alert ref={alertRef} />
        </UsersListProvider.Provider>
      </LocalUserProvider.Provider>
    </SocketProvider.Provider>
  );
}

export default App;
