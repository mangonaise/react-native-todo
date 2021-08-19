import React from 'react';
import { listColors } from '../logic/list';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import prepareLayoutAnimation from '../react-helpers/prepareLayoutAnimation';
import Task from './Task';
import TaskInstance from '../logic/task';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import AppContext from '../react-helpers/appContext';

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

  function cancelTaskEdit() {
    prepareLayoutAnimation();
    app.setTaskBeingEdited(null);
    return true;
  }

  return (
    <View style={styles.tasksContainer} onStartShouldSetResponder={cancelTaskEdit}>
      <View style={styles.titleContainer}>
        <FontAwesomeIcon icon={faCircle} color={listColors[app.activeList.colorId]} />
        <Text style={styles.sectionTitle}>
          {app.activeList.name}
        </Text>
      </View>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  sectionTitle: {
    marginHorizontal: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b3b3b'
  }
});

export default observer(TasksContainer);