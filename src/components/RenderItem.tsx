import React from "react";
import {View,Text,TouchableOpacity,Alert} from "react-native";
import styles from "../styles";
import {Task} from "../../App";

interface ItemProps {
  item: Task;
  markDone: (task: Task) => void;
  deleteFunction: (task: Task) => void;
}

export default function RenderItem({item, markDone, deleteFunction,}: ItemProps) {
  const confirmDelete = (task: Task) => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro de que deseas eliminar la tarea "${task.title}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => deleteFunction(task),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return ( 
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => markDone(item)}>
        <Text style={item.done ? styles.textDone : styles.text}>{item.title}</Text>
        <Text style={item.done ? styles.textDone : styles.text}>{new Date(item.date).toLocaleDateString()}</Text>
      </TouchableOpacity>
      {item.done && (
        <TouchableOpacity style={styles.removeButton} onPress={() => confirmDelete(item)}>
          <Text style={styles.whiteText}>Eliminar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}