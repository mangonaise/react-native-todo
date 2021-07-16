import React from 'react';
import { StyleSheet, View } from 'react-native';
import NewTaskSection from './components/NewTaskSection';
import TasksContainer from './components/TasksContainer';
import AppInstance from './logic/appInstance';
import AppContext from './logic/appContext';

const appInstance = new AppInstance();

export default function App() {
  return (
    <View style={styles.container}>
      <AppContext.Provider value={appInstance}>
        <TasksContainer />
        <NewTaskSection />
      </AppContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e6eb',
  }
});
