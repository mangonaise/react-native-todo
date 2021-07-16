import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  text: string
}

const Task = ({ text }: Props) => {
  return (
    <View style={styles.task}>
      <Text style={styles.taskText}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  task: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  taskText: {

  }
})

export default Task;