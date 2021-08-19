import React from 'react';
import AppContext from '../react-helpers/appContext';
import ModalsContext from '../react-helpers/modalsContext';
import Modal from 'react-native-modal';
import { listColors } from '../logic/list';
import { faCircle, faDotCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useEffect } from 'react';
import { useState } from 'react';
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useRef } from 'react';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';

const ListEditorModal = () => {
  const app = useContext(AppContext);
  const modalsHandler = useContext(ModalsContext);
  const listBeingEdited = modalsHandler.listBeingEdited;
  const isNewList = useRef(false);
  const [listName, setListName] = useState('');
  const [listColorId, setListColorId] = useState(listBeingEdited?.colorId ?? 0);

  function hide() {
    modalsHandler.setListBeingEdited(null);
  }

  function saveList() {
    const updatedList = listBeingEdited!;
    updatedList.renameList(listName);
    updatedList.setColorId(listColorId);
    if (isNewList.current) {
      app.addList(updatedList);
      app.setActiveList(updatedList);
      isNewList.current = false;
    }
    Keyboard.dismiss();
    hide();
  }

  function handleCancel() {
    Keyboard.dismiss();
    hide();
  }

  function handleDeleteButtonPress() {
    if (listBeingEdited!.tasks.length === 0) {
      app.deleteList(listBeingEdited!);
    } else {
      modalsHandler.setListBeingDeleted(listBeingEdited);
    }
    hide();
  }

  useEffect(() => {
    if (listBeingEdited) {
      setListName(listBeingEdited.name);
      setListColorId(listBeingEdited.colorId);
      isNewList.current = !(!!listBeingEdited.name);
    }
  }, [listBeingEdited])

  return (
    <Modal
      onDismiss={hide}
      isVisible={!!listBeingEdited}
      onBackdropPress={hide}
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      style={styles.modal}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            value={listName}
            placeholder="Untitled list"
            onChangeText={setListName}
            style={styles.input}
          />
          {(!isNewList.current) && (
            <TouchableOpacity
              onPress={handleDeleteButtonPress}
              style={[styles.deleteButton, app.lists.length === 1 && { opacity: 0.4 }]}
              disabled={app.lists.length === 1}>
              <FontAwesomeIcon icon={faTrashAlt} size={20} color="#d9554c" />
            </TouchableOpacity>)}
        </View>

        <ColorSelector
          initialColorId={listBeingEdited?.colorId ?? 0}
          onChangeColor={colorId => setListColorId(colorId)}
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleCancel}>
            <Text style={[styles.buttonText, { color: '#878787' }]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={saveList}
            style={[styles.button, !listName && { opacity: 0.5 }]}
            disabled={!listName}>
            <Text style={[styles.buttonText, { color: '#4c9acf' }]}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

interface ColorSelectorProps {
  initialColorId: number,
  onChangeColor: (colorId: number) => void
}

const ColorSelector = ({ initialColorId, onChangeColor }: ColorSelectorProps) => {
  const [selectedColorId, setSelectedColorId] = useState<number>(initialColorId);

  function handleSelectColorId(colorId: number) {
    setSelectedColorId(colorId);
    onChangeColor(colorId);
  }

  return (
    <View style={styles.colorsContainer}>
      {listColors.map((hex, index) => (
        <TouchableOpacity
          onPress={() => handleSelectColorId(index)}
          style={[styles.colorButton]}
          key={index}>
          <FontAwesomeIcon
            icon={selectedColorId === index ? faDotCircle : faCircle}
            color={hex}
            size={30}
          />
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  container: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  input: {
    flexGrow: 1,
    paddingVertical: 5,
    borderBottomWidth: 1.5,
    borderBottomColor: '#e0e0e0',
    flex: 1
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    paddingVertical: 10
  },
  buttonText: {
    fontWeight: '700',
    borderBottomColor: 'gray'
  },
  colorsContainer: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  colorButton: {
    width: 40,
    height: 40,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteButton: {
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 8
  }
});

export default observer(ListEditorModal);