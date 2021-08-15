import React from 'react';
import { observer } from 'mobx-react-lite';
import ListDeleteModal from './ListDeleteModal';
import ListEditorModal from './ListEditorModal';
import ListSelectModal from './ListSelectModal';


const ModalsContainer = () => {
  return (
    <>
      <ListSelectModal />
      <ListEditorModal />
      <ListDeleteModal />
    </>
  )
}

export default observer(ModalsContainer);