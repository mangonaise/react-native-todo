import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Task from './components/Task';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.tasksContainer}>
        <Text style={styles.sectionTitle}>Your tasks</Text>
        <View style={styles.items}>
          <Task text="be cool" />
          <Task text="make things" />
          <Task text="eat and sleep" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e6eb',
  },
  tasksContainer: {
    paddingTop: 25,
    paddingHorizontal: 25
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
  },
  items: {
    marginTop: 20
  }
});
