import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
     width: "100%",
     padding: 20,
    },
    title: {
      fontSize: 30,
      color: "black",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 15,
    },
    text: {
      color: "black",
      fontSize: 17,
      fontWeight: "bold",
    },
    textDone: {
      color: "black",
      fontSize: 17,
      fontWeight: "bold",
      textDecorationLine: "line-through",
    },
    whiteText: {
      fontSize: 15,
      color: "white",
      fontWeight: "bold",
    },
    textInput : {
      borderColor: "black",
      borderWidth: 3.5,
      width: Dimensions.get("screen").width * 0.6,
      borderRadius: 10,
      paddingLeft: 15,
      fontSize: 15,
      color: "black",
    },
    inputContainer: {
      marginTop: 30,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    addButton: {
      backgroundColor: "blue",
      justifyContent: "center",
      alignItems: "center",
      width: Dimensions.get("screen").width * 0.25,
      borderRadius: 10,
      borderColor: "black",
      borderWidth: 3,     
    },
    scrollContainer: {
      marginTop: 50,    
    },
    itemContainer: {
      paddingVertical: 10,
      borderBottomColor: "black",
      borderBottomWidth: 3,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    removeButton: {
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      paddingHorizontal: 15,
      borderColor: "black",
      borderWidth: 3,
    }
});

export default styles;