import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import List from '../logic/list';

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
    borderBottomWidth: 1.5,
    borderBottomColor: '#e0e0e0'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  buttonText: {
    fontWeight: '700',
    borderBottomColor: 'gray'
  }
});

export default ListEditorModal;