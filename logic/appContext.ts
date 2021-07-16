import React from 'react';
import AppInstance from './appInstance';

const AppContext = React.createContext<AppInstance>(null!);

export default AppContext;