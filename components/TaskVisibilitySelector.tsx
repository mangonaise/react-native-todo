import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AppContext from '../react-helpers/appContext';

const TaskVisibilitySelector = () => {
  const app = useContext(AppContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => app.setShowCompletedTasks(false)}
        style={[styles.button, styles.leftButton, !app.showCompletedTasks && { backgroundColor: app.activeListColor }]}>
        <Text style={!app.showCompletedTasks ? styles.selectedText : styles.buttonText}>
          Active
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => app.setShowCompletedTasks(true)}
        style={[styles.button, styles.rightButton, app.showCompletedTasks && { backgroundColor: app.activeListColor }]}>
        <Text style={app.showCompletedTasks ? styles.selectedText : styles.buttonText}>
          Completed
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 25,
    marginBottom: 15
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 40,
    backgroundColor: 'white'
  },
  buttonText: {
    color: '#888888'
  },
  selectedText: {
    color: 'white'
  },
  leftButton: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  rightButton: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  }
});

export default observer(TaskVisibilitySelector);