import React from 'react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AppContext from '../logic/appContext';
import Task from './Task';

const TasksContainer = () => {
  const app = useContext(AppContext);

  return (
    <ScrollView style={styles.tasksContainer}>
      <Text style={styles.sectionTitle}>Your tasks</Text>
      <View style={styles.items}>
        {app.tasks
          .filter(task => !task.isComplete)
          .map(task => <Task task={task} key={task.id} />)}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  tasksContainer: {
    paddingTop: 25,
  },
  sectionTitle: {
    fontSize: 24,
    paddingHorizontal: 25,
    fontWeight: 'bold',
    color: 'black'
  },
  items: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30
  }
});

export default observer(TasksContainer);