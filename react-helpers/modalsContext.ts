import React from 'react';
import ModalsHandler from '../logic/modalsHandler';

const ModalsContext = React.createContext<ModalsHandler>(null!);

export default ModalsContext;