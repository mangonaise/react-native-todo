import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AppContext from '../react-helpers/appContext';
import Task from '../logic/task';

interface Props {
  task: Task,
  prepareLayoutAnimation: () => void
}

const TaskEditor = ({ task, prepareLayoutAnimation }: Props) => {
  const app = useContext(AppContext);
  const [taskText, setTaskText] = useState(task.text);

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
        value={taskText}
        onChangeText={setTaskText}
        style={styles.input}  
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={closeEditor}>
          <Text style={[styles.buttonText, { color: '#878787' }]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={[styles.buttonText, { color: '#4c9acf' }]}>Rename</Text>
        </TouchableOpacity>
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