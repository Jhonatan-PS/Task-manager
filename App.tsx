import React, {useState, useEffect} from "react";
import {View,Text,TextInput,TouchableOpacity,FlatList,SafeAreaView,Alert} from "react-native";
import styles from "./src/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RenderItem from "./src/components/RenderItem";

export interface Task {
  id: string;
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
    const taskExists = tasks.some(task => task.title === text);
    if (taskExists) {
      Alert.alert("Error", "Ya existe una tarea con ese nombre");
      return;
    }
    
    const newTask = {
      id: Date.now().toString(), // Generar un id único
      title: text,
      done: false,
      date: new Date(),
    };

    const tmp = [...tasks, newTask];
    setTasks(tmp);
    storeData(tmp);
    setText('');
  };

  const markDone = (task: Task) => {
    const tmp = tasks.map(t => t.id === task.id ? {...t, done: !t.done} : t);
    setTasks(tmp);
    storeData(tmp);
  };

  const deleteFunction = (task: Task) => {
    const tmp = tasks.filter(t => t.id !== task.id);
    setTasks(tmp);
    storeData(tmp);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Task manager</Text>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Agregar tarea" onChangeText={(t: string) => setText(t)} style={styles.textInput} value={text}/>
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.whiteText}>Agregar</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList style={styles.scrollContainer} renderItem={({item}) => ( <RenderItem item={item} deleteFunction={deleteFunction} markDone={markDone}/>)} data={tasks}/>
      
    </SafeAreaView>
  );
}