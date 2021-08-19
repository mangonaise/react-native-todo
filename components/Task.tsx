import React from 'react';
import * as Haptics from 'expo-haptics';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useContext } from 'react';
import { useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Pressable } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import TaskInstance from '../logic/task';
import AppContext from '../react-helpers/appContext';
import TaskEditor from './TaskEditor';
import prepareLayoutAnimation from '../react-helpers/prepareLayoutAnimation';

interface Props {
  task: TaskInstance,
  onDrag: () => void,
  isDragging: boolean
}

const Task = ({ task, onDrag, isDragging }: Props) => {
  const app = useContext(AppContext);
  const exitAnimationProgress = useRef(new Animated.Value(0)).current;
  const [swipeDirection, setSwipeDirection] = useState<1 | -1>(1);

  function handleComplete() {
    prepareLayoutAnimation();
    app.activeList.setTaskAsComplete(task);
  }

  function handleDelete() {
    prepareLayoutAnimation();
    app.activeList.deleteTask(task);
  }

  function handlePress() {
    prepareLayoutAnimation();
    app.setTaskBeingEdited(task);
  }

  function handleLongPress() {
    onDrag();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }

  function handleSwipe(direction: 'left' | 'right') {
    Animated.timing(exitAnimationProgress, {
      toValue: 1,
      duration: 250,
      delay: 250,
      useNativeDriver: true
    }).start();
    setSwipeDirection(direction === 'left' ? 1 : -1);
  }

  const { opacity, translateX } = getExitAnimationProperties(exitAnimationProgress, swipeDirection);

  if (app.taskBeingEdited === task) {
    return <TaskEditor task={task} prepareLayoutAnimation={prepareLayoutAnimation} />
  }

  return (
    <Pressable
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: isDragging ? 0.65 : 1
      }}
      delayLongPress={300}
      onPress={handlePress}
      onLongPress={handleLongPress}>
      <Animated.View style={[styles.taskContainer, { opacity, translateX }]}>
        <Swipeable
          renderLeftActions={ActionDone}
          renderRightActions={ActionDelete}
          onSwipeableLeftOpen={handleComplete}
          onSwipeableLeftWillOpen={() => handleSwipe('left')}
          onSwipeableRightOpen={handleDelete}
          onSwipeableRightWillOpen={() => handleSwipe('right')}>
          <View style={styles.task}>
            <Text style={styles.taskText}>{task.text}</Text>
          </View>
        </Swipeable>
      </Animated.View>
    </Pressable>
  )
}

const ActionDone = (progress: Animated.AnimatedInterpolation) => {
  const opacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-0.2, 2]
  });

  return (
    <Animated.View style={[styles.doneContainer, { opacity }]}>
      <FontAwesomeIcon style={styles.doneIcon} icon={faCheck} />
    </Animated.View>
  )
}

const ActionDelete = (progress: Animated.AnimatedInterpolation) => {
  const opacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-0.2, 2]
  });

  return (
    <Animated.View style={[styles.deleteContainer, { opacity }]}>
      <FontAwesomeIcon style={styles.deleteIcon} icon={faTrash} />
    </Animated.View>
  )
}

const getExitAnimationProperties = (t: Animated.Value, swipeDirection: number) => {
  const translateX = t.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 15 * swipeDirection]
  });

  const opacity = t.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });

  return { translateX, opacity }
}

const styles = StyleSheet.create({
  taskContainer: {
    width: '100%',
  },
  task: {
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 50,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 25,
  },
  taskText: {
    color: '#4f4f4f',
    height: '100%',
    overflow: 'hidden'
  },
  doneContainer: {
    marginLeft: 25,
    width: Dimensions.get('window').width - 50,
    height: 50,
    backgroundColor: '#3aab5a',
    justifyContent: 'center',
    borderRadius: 10,
  },
  doneIcon: {
    color: 'white',
    marginLeft: 15
  },
  deleteContainer: {
    marginRight: 25,
    width: Dimensions.get('window').width - 50,
    height: 50,
    backgroundColor: '#cf3c3c',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 10
  },
  deleteIcon: {
    color: 'white',
    marginRight: 15
  }
})

export default observer(Task);