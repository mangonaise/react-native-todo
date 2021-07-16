import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const NewTaskSection = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.newTaskContainer}>
      <TextInput style={styles.newTaskInput} placeholder="New task" />
      <TouchableOpacity>
        <View style={styles.addTaskButton}>
          <Text style={styles.addTaskIcon}>+</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  newTaskContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newTaskInput: {
    padding: 15,
    marginRight: 20,
    width: '65%',
    backgroundColor: 'white',
    borderRadius: 60,
    borderColor: '#d9d9d9',
    borderWidth: 1
  },
  addTaskButton: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#d9d9d9',
    borderWidth: 1
  },
  addTaskIcon: {
    fontSize: 24,
    color: 'gray'
  }
});

export default NewTaskSection;