import React from 'react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppContext from '../logic/appContext';
import Task from './Task';

const TasksContainer = () => {
  const app = useContext(AppContext);

  return (
    <View style={styles.tasksContainer}>
      <Text style={styles.sectionTitle}>Your tasks</Text>
      <View style={styles.items}>
        {app.tasks.map(task => <Task text={task.text} key={task.id} />)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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

export default observer(TasksContainer);