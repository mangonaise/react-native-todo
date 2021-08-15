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
  const [listColorId, setListColorId] = useState(listBeingEdited?.colorId ?? 0);

  function saveList() {
    listBeingEdited!.renameList(listName);
    listBeingEdited!.setColorId(listColorId);
    Keyboard.dismiss();
    hide();
  }

  function handleCancel() {
    Keyboard.dismiss();
    hide();
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