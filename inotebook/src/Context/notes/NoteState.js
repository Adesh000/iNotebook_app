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

    

    console.log("Adding new note");
    const note = {
      _id: "63a7b44c36603f49baf849ec",
      user: "63a2821aef328e3b79c34fb4",
      title: title,
      description: description,
      tag: tag,
      date: "2022-12-25T02:24:12.116Z",
      __v: 0,
    };

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
    const json = response.json()
    console.log(json)
    console.log("Deleting a Note");
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5MzIxODUzM2ZiOTVhM2JjYTRkOGI5In0sImlhdCI6MTY3MDc1MzkyM30.ox4raT_-DdPkmZSYMtUkP0PB2zhw9tqRnaJ3jHjTEM4",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
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
