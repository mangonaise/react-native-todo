import React from 'react';
import AppContext from '../logic/appContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const NewTaskSection = () => {
  const app = useContext(AppContext);
  const [taskText, setTaskText] = useState('');

  function addTask() {
    Keyboard.dismiss();
    app.addTask(taskText);
    setTaskText('');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.newTaskContainer}>
      <TextInput 
        style={styles.newTaskInput} 
        placeholder="New task"
        value={taskText}
        onChangeText={setTaskText} />
      <TouchableOpacity onPress={addTask} disabled={taskText === ''}>
        <View style={[styles.addTaskButton, taskText === '' && styles.disabled]}>
          <Text style={styles.addTaskIcon}>+</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  newTaskContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#b0b4bf',
    borderTopWidth: 1,
    backgroundColor: '#caced9'
  },
  newTaskInput: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginRight: 20,
    marginVertical: 20,
    width: '65%',
    backgroundColor: 'white',
    borderRadius: 60,
    borderColor: '#b0b4bf',
    borderWidth: 1
  },
  addTaskButton: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#b0b4bf',
    borderWidth: 1
  },
  addTaskIcon: {
    fontSize: 16,
    color: 'gray'
  },
  disabled: {
    opacity: 0.5
  }
});

export default NewTaskSection;