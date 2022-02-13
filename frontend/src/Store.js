// Credit: Professor David Harrison's Shared Context Example
// and
// https://medium.com/@danfyfe/using-react-context-with-functional-components-153cbd9ba214
import React, {useState} from 'react';

export const User = React.createContext();


const Store = ({children}) => {
  const [user, setUser] = useState({
    'id': '', 'name': '', 'password': '',
    'email': '', 'role': '', 'workspaces': [],
  });

  return (
    <User.Provider value={[user, setUser]}> {children}
    </User.Provider>
  );
};

export default Store;
