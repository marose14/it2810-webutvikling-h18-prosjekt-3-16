import React from 'react';
import Note from "./Note"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
 } from 'react-native';

export default class Todo extends React.Component {
  constructor (props){
    super(props);
    this.state={
      //to save every note made by the user
      noteArray: [],
      //a container for writting and passing text to notes.
      noteText:"",
    }
    // a generic AsyncStorage that fetches the whole save state of TODO.js
    AsyncStorage.getItem("state").then((myState)=>{
      this.setState(JSON.parse(myState));
    });

  }

  render() {
    //A map of all previously made Note Objects.
    let notes = this.state.noteArray.map((val,key) => {
      return <Note key={key} keyval={key} val={val}
      //Methode called in Notes.Js to delete a note.
      deleteMethod={
        ()=> this.deleteNote(key) } />
      });
    return (
      <View style={styles.container}>

        <View style={styles.header}>
        // A header to indicate what the page is showing.
          <Text style={styles.headerText}> - NOTATER - </Text>
        </View>
        // A container that allows the user to have more notes than the screen can show.
        <ScrollView style={styles.scrollContainer} >
        //calling the earlier map of all Note.js objects
        {notes}

        </ScrollView>

        <View style={styles.footer}>
        //input field for text to be written to notes. Includes a placeholder to show where to tap.
            <TextInput styke={styles.textInput}
            placeholder="            note"
            //Makes sure that all changes in text is stored in the state.
            onChangeText={(noteText) => this.setState({noteText})}
            //makes the text passable to Note.js
            value={this.state.noteText}
            placeholderTextColor="black"
            underlineColorAndroid="transparent">

           </TextInput>
        </View>
        //Adds new notes and saves data every time a new note is made.
        <TouchableOpacity onChangeText={this.saveData()} onPress={this.addNote.bind(this)} style={styles.addButton}>
        //Button to indicate how to save a note.
          <Text style = {styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

    );

    }
    //a barebones AsyncStorage function to save a state as a JSON object.
    saveData(){
      AsyncStorage.setItem("state",JSON.stringify(this.state));
    }
    // function for making a new Note.js object and passing the correct data.
    addNote() {
      if (this.state.noteText){

        var d = new Date();
        this.state.noteArray.push({
          "date": d.getFullYear() +
          "/" + (d.getMonth()+1)+
          "/"+ d.getDate()
          +" "+d.getHours()
          +":"+d.getMinutes()
          +":"+d.getSeconds(),
          "note": this.state.noteText
        });

        this.setState ({ noteArray: this.state.noteArray})
        this.setState({ noteText:" "})
      }

  }
  //function to be passed to note.js for deletion of notes.
  deleteNote(key){
    this.state.noteArray.splice(key,1);
    this.setState({noteArray: this.state.noteArray})
  }

}

const styles = StyleSheet.create({
  container : {
    flex:1,},
  header : {
      backgroundColor: "magenta",
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth:10,
      borderBottomColor: "#ddd",
    },
  headerText: {
      color: "white",
      fontSize:18,
      padding:26,
    },
  scrollContainer: {
      flex:1,
      marginBottom:100,},
  footer : {
      position: "absolute",
      bottom:0,
      left:0,
      right:0,
      zIndex:10

    },
  textInput : {
      alignSelf:"stretch",
      color:"#fff",
      padding: 20,
      backgroundColor: "#fff",
      borderTopWidth: 50  ,
      borderTopColor:"#ededed",
      bottom: 70,
    },
  addButton : {
      position:"absolute",
      zIndex:11,
      right:20,
      bottom:90,
      backgroundColor:"#E91E63",
      width:70,
      height:70,
      borderRadius:50,
      alignItems:"center",
      justifyContent:"center",
      elevation:8,
    },
  addButtonText : {
      color:"#fff",
      fontSize: 40,
    }



});
