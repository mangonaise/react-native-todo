import React from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TaskInstance from '../logic/task';
import AppContext from '../react-helpers/appContext';
import prepareLayoutAnimation from '../react-helpers/prepareLayoutAnimation';


interface Props {
  task: TaskInstance
}

const CompletedTask = ({ task }: Props) => {
  const app = useContext(AppContext);

  function restoreTask() {
    prepareLayoutAnimation();
    app.activeList.setTaskAsIncomplete(task);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={restoreTask} style={styles.restoreButton}>
        <FontAwesomeIcon icon={faCheck} size={16} color={app.activeListColor} style={{ opacity: 0.8 }} />
      </TouchableOpacity>
      <Text style={styles.taskText}>
        {task.text}
      </Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  taskText: {
    fontSize: 16,
    color: '#666666',
    textDecorationLine: 'line-through',
    flex: 1
  },
  restoreButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginRight: 15
  }
})

export default CompletedTask;