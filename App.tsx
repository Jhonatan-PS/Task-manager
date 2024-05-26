import React, {useState, useEffect} from "react";
import {View,Text,TextInput,TouchableOpacity,FlatList} from "react-native";
import styles from "./src/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RenderItem from "./src/components/RenderItem";

export interface Task {
  title: string;
  done: boolean;
  date: Date;
}

export default function App() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const storeData = async (value: Task[]) => {
    try {
      await AsyncStorage.setItem('my-key', JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('my-key');
      if (value !== null) {
        const tasksLocal = JSON.parse(value);  
        setTasks(tasksLocal);      
      }
    } catch(e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const addTask = () => {
    const tmp = [...tasks];
    const newTask = {
      title: text,
      done: false,
      date: new Date(),
    }
    tmp.push(newTask);
    setTasks(tmp);
    storeData(tmp);
    setText('');
  };

  const markDone = (task: Task) => {
    const tmp = [...tasks];
    const index = tmp.findIndex(t => t.title === task.title);
    const todo = tmp[index];
    todo.done = !todo.done;
    setTasks(tmp);
    storeData(tmp);
  };

  const deleteFunction = (task: Task) => {
    const tmp = [...tasks];
    const index = tmp.findIndex(t => t.title === task.title);
    tmp.splice(index, 1);
    setTasks(tmp);
    storeData(tmp);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task manager</Text>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Agregar tarea" onChangeText={(t: string) => setText(t)} style={styles.textInput} value={text}/>
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.whiteText}>Agregar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scrollContainer}>
        <FlatList renderItem={({item}) => ( <RenderItem item={item} deleteFunction={deleteFunction} markDone={markDone}/>)} data={tasks}/>
      </View>
    </View>
  );
}