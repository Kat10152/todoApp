import React, { useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, View, TextInput, Button } from 'react-native';
import { CheckBox } from '@rneui/base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 50,
    paddingTop: 50,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  taskText: {
    fontSize: 18,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default function App() {
  const [tasks, setTasks] = useState([
    { id: '1', description: 'Do homework', completed: false },
    { id: '2', description: 'Feed cats', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');

  const completeTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: (tasks.length + 1).toString(),
        description: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <CheckBox
        checked={item.completed}
        onPress={() => completeTask(item.id)}
      />
      <Text
        style={[
          styles.taskText,
          item.completed && { textDecorationLine: 'line-through', textDecorationStyle: 'solid' },
        ]}
      >
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TextInput
        style={styles.input}
        value={newTask}
        onChangeText={setNewTask}
        placeholder="Enter a new Task"
      />
      <Button title="Add task"
        onPress={addTask}
        style={styles.button}
      />
    </SafeAreaView>
  );
}