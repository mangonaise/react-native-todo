import React from 'react';
import AppContext from '../logic/appContext';
import { useState } from 'react';
import { useContext } from 'react';
import { Dimensions, Keyboard, KeyboardAvoidingView, LayoutAnimation, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faList, faPlus } from '@fortawesome/free-solid-svg-icons';
import ListSelectModal from './ListSelectModal';
import List from '../logic/list';

const ActionsBar = () => {
  const [showListsModal, setShowListsModal] = useState(false);
  const [listBeingEdited, setListBeingEdited] = useState<null | List>(null);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.actionsBarContainer}>
        <TouchableOpacity onPress={() => setShowListsModal(true)}>
          <View style={styles.circularButton}>
            <FontAwesomeIcon icon={faList} color="gray" />
          </View>
        </TouchableOpacity>
        <NewTaskSection />
      </KeyboardAvoidingView>
      <ListSelectModal
        isOpen={showListsModal}
        onEditList={list => setListBeingEdited(list)}
        onClose={() => setShowListsModal(false)}
      />
    </>
  )
}

const NewTaskSection = () => {
  const app = useContext(AppContext);
  const [taskText, setTaskText] = useState('');

  function addTask() {
    LayoutAnimation.configureNext(LayoutAnimation.create(
      200,
      LayoutAnimation.Types.easeInEaseOut,
      LayoutAnimation.Properties.opacity));
    Keyboard.dismiss();
    app.activeList.addTask(taskText);
    setTaskText('');
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.newTaskInput}
        placeholder="New task"
        value={taskText}
        onChangeText={setTaskText} />
      <TouchableOpacity onPress={addTask} disabled={taskText === ''}>
        <View style={[styles.circularButton, styles.addTaskButton, taskText === '' && styles.disabled]}>
          <FontAwesomeIcon icon={faPlus} color="white" style={styles.addTaskIcon} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  actionsBarContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#caced9'
  },
  newTaskInput: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 20,
    height: 50,
    width: Dimensions.get('window').width * 0.6,
    backgroundColor: 'white',
    borderRadius: 60,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  circularButton: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addTaskButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: '#8197d4',
  },
  addTaskIcon: {
    position: 'relative',
    right: 1
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: 'gray'
  }
});

export default ActionsBar;