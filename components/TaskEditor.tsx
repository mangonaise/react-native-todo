import React from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { TextInput, View, StyleSheet, Pressable, Text } from 'react-native';
import AppContext from '../logic/appContext';
import Task from '../logic/task';

interface Props {
  task: Task,
  prepareLayoutAnimation: () => void
}

const TaskEditor = ({ task, prepareLayoutAnimation }: Props) => {
  const app = useContext(AppContext);
  const [taskText, setTaskText] = useState(task.text);
  const inputRef = useRef<any>();

  function closeEditor() {
    prepareLayoutAnimation();
    app.setTaskBeingEdited(null);
  }

  function handleSave() {
    task.text = taskText;
    closeEditor();
  }

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        value={taskText}
        onChangeText={setTaskText}
        style={styles.input}  
      />
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={closeEditor}>
          <Text style={[styles.buttonText, { color: '#878787' }]}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={[styles.buttonText, { color: '#4c9acf' }]}>Rename</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 25
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
})

export default TaskEditor;