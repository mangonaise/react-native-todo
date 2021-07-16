import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NewTaskSection from './components/NewTaskSection';
import TasksContainer from './components/TasksContainer';
import AppInstance from './logic/appInstance';

const appInstance = new AppInstance();
export const AppContext = React.createContext(appInstance);
const AppProvider = AppContext.Provider;

export default function App() {
  return (
    <View style={styles.container}>
      <AppProvider value={appInstance}>
        <TasksContainer />
        <NewTaskSection />
      </AppProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e6eb',
  }
});
