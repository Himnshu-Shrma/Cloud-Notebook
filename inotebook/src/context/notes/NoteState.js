import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const [notes, setNotes] = useState([]);
  const [name, setName] = useState('Get User');
  // We will be creating different functions for different operatrions on notes

  //Fetch all Note
  const getNotes = async () => {
    // TODO: API Call
    const url = `${host}/api/notes/fetchallnotes`
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = await response.json();
    setNotes(json);

  }
  //Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    const url = `${host}/api/notes/addnote`
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    
    setNotes(notes.concat(note));//Concat returns an array 

  }
  //Delete a Note
  const deleteNote = async (id) => {
    // TODO: API Call
    const url = `${host}/api/notes/deletenote/${id}`
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    const json = await response.json();
    console.log(json)
    const newNodes = notes.filter((note) => { return note._id !== id })
    setNotes(newNodes);

  }
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    // TODO: API Call
    const url = `${host}/api/notes/updatenote/${id}`
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)
    console.log("editing note with id " + id);
    let newNotes=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }
  const getUserData = async () => {
    // TODO: API Call
    const url = "http://localhost:5000/api/auth/getuser/";
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "auth-token":localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = await response.json();
    setName(json.name)

  }








  // This is for understanding of useContext
  // const s1 = {
  //     "name": "Himanshu",
  //     "class": "4C"
  // };
  // const [state, setState] = useState(s1);
  // //Writing a function to update info after 1 second
  // const update = () => {
  //     setTimeout(() => {
  //         setState({
  //             "name": "WhatsUp bro",
  //             "class": "F"
  //         })
  //     }, 5000)
  // }state and update will be passed in value
  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote,name,getUserData }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;

// Now when we will wrap the app in NoteState then we will be able to access
// all the children/Props (present in NoteContext tag above) in all the components

// parses JSON response into native JavaScript objects
