import 'react-native-gesture-handler';
import React from 'react';
import { Platform, StyleSheet, UIManager, View } from 'react-native';
import NewTaskSection from './components/NewTaskSection';
import TasksContainer from './components/TasksContainer';
import AppInstance from './logic/appInstance';
import AppContext from './logic/appContext';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const appInstance = new AppInstance();

export default function App() {
  return (
    <AppContext.Provider value={appInstance}>
      <View style={styles.container}>
        <TasksContainer />
        <NewTaskSection />
      </View>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#e4e6eb',
  }
});
