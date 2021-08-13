import React from 'react';
import { faCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useEffect } from 'react';
import { useState } from 'react';
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import List, { listColors } from '../logic/list';

interface Props {
  listBeingEdited: List | null,
  hide: () => void
}

const ListEditorModal = ({ listBeingEdited, hide }: Props) => {
  const [listName, setListName] = useState('');

  function saveList() {
    listBeingEdited!.renameList(listName);
    Keyboard.dismiss();
    hide();
  }

  function handleCancel() {
    Keyboard.dismiss();
    hide();
  }

  function handleSelectColor(colorId: number) {
    listBeingEdited!.setColorId(colorId);
  }

  useEffect(() => {
    if (listBeingEdited) {
      setListName(listBeingEdited.name);
    }
  }, [listBeingEdited])

  return (
    <Modal
      onDismiss={hide}
      isVisible={!!listBeingEdited}
      onBackdropPress={hide}
      useNativeDriverForBackdrop
      style={styles.modal}>
      <View style={styles.container}>
        <TextInput
          value={listName}
          onChangeText={setListName}
          style={styles.input}
        />
        <ColorSelector initialColorId={listBeingEdited?.colorId ?? 0} onSelectColor={handleSelectColor} />
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
  onSelectColor: (colorId: number) => void
}

const ColorSelector = ({ initialColorId, onSelectColor }: ColorSelectorProps) => {
  const [selectedColorId, setSelectedColorId] = useState<number>(initialColorId);

  function handleSelectColorId(colorId: number) {
    setSelectedColorId(colorId);
    onSelectColor(colorId);
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
    paddingVertical: 5,
    borderBottomWidth: 1.5,
    borderBottomColor: '#e0e0e0'
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
  }
});

export default ListEditorModal;