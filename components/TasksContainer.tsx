import React from 'react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import AppContext from '../logic/appContext';
import Task from './Task';
import TaskInstance from '../logic/task';

type ListItem = {
  key: string;
  task: TaskInstance
};

function TasksContainer() {
  const app = useContext(AppContext);

  const data = app.activeList.tasks
    .filter(task => !task.isComplete)
    .map(task => ({
      key: task.id,
      task
    } as ListItem));

  return (
    <View style={styles.tasksContainer}>
      <Text style={styles.sectionTitle}>{app.activeList.name}</Text>
      <DraggableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        onDragEnd={({ data }) => app.activeList.setTasks(data.map(item => item.task))}
        keyboardShouldPersistTaps="always"
      />
    </View>
  );
}

const renderItem = ({ item, index, drag, isActive }: RenderItemParams<ListItem>) => {
  return (
    <Task task={item.task} isDragging={isActive} onDrag={drag} />
  );
}

const styles = StyleSheet.create({
  tasksContainer: {
    flex: 1,
    paddingTop: 25,
    height: '100%'
  },
  sectionTitle: {
    fontSize: 24,
    paddingHorizontal: 25,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black'
  }
});

export default observer(TasksContainer);