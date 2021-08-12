import React from 'react';
import AppInstance from '../logic/appInstance';

const AppContext = React.createContext<AppInstance>(null!);

export default AppContext;