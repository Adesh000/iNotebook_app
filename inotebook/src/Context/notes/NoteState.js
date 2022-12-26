import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000/";

  const [notes, setNotes] = useState([]);
  
  const getNotes = async () => {
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5MzIxODUzM2ZiOTVhM2JjYTRkOGI5In0sImlhdCI6MTY3MDc1MzkyM30.ox4raT_-DdPkmZSYMtUkP0PB2zhw9tqRnaJ3jHjTEM4",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };


  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5MzIxODUzM2ZiOTVhM2JjYTRkOGI5In0sImlhdCI6MTY3MDc1MzkyM30.ox4raT_-DdPkmZSYMtUkP0PB2zhw9tqRnaJ3jHjTEM4",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    

    
    const note = await response.json()

    setNotes(notes.concat(note));
  };

  const deleteNote = async (id) => {
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5MzIxODUzM2ZiOTVhM2JjYTRkOGI5In0sImlhdCI6MTY3MDc1MzkyM30.ox4raT_-DdPkmZSYMtUkP0PB2zhw9tqRnaJ3jHjTEM4'
      }
    })
    const json = await response.json()
    console.log(json)
    console.log("Deleting a Note");
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5MzIxODUzM2ZiOTVhM2JjYTRkOGI5In0sImlhdCI6MTY3MDc1MzkyM30.ox4raT_-DdPkmZSYMtUkP0PB2zhw9tqRnaJ3jHjTEM4",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    
    const newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
