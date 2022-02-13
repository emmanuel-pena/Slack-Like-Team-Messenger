// Credit: Professor David Harrison's Shared Context Example
// and
// https://medium.com/@danfyfe/using-react-context-with-functional-components-153cbd9ba214
import React from 'react';
const globalContext = React.createContext({});
export const GlobalProvider = globalContext.Provider;
export default globalContext;


