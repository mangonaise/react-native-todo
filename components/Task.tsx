import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import TaskInstance from '../logic/task';
import AppContext from '../logic/appContext';

const Task = ({ task }: { task: TaskInstance }) => {
  const app = useContext(AppContext);
  const [swipeDirection, setSwipeDirection] = useState<1 | -1>(1);
  const animationValue = useRef(new Animated.Value(0)).current;

  function handleComplete() {
    task.setComplete(true);
  }

  function handleDelete() {
    app.deleteTask(task);
  }

  function handleSwipe(direction: 'left' | 'right') {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 250,
      delay: 250,
      useNativeDriver: true
    }).start();
    setSwipeDirection(direction === 'left' ? 1 : -1);
  }

  const translateX = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 15 * swipeDirection]
  });

  const opacity = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });

  return (
    <Animated.View style={[styles.taskContainer, { translateX, opacity }]}>
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
  )
}

const ActionDone = (progress: Animated.AnimatedInterpolation) => {
  const opacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-0.2, 2]
  });

  return (
    <Animated.View style={[styles.doneContainer, { opacity }]}>
      <Text style={styles.doneText}>Done</Text>
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
      <Text style={styles.deleteText}>Delete</Text>
    </Animated.View>
  )
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
  doneText: {
    color: 'white',
    paddingLeft: 15,
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
  deleteText: {
    color: 'white',
    paddingRight: 15,
  }
})

export default Task;