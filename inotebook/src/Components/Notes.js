import React, { useContext, useEffect } from "react";
import noteContext from "../Context/notes/noteContext";
import AddNote from "./AddNote";
import NotesItem from "./NotesItem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;

  useEffect(() => {
    getNotes()
  })
  return (
    <div>
      <AddNote />
      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.map((note) => {
          return <NotesItem note={note} />;
        })}
      </div>
    </div>
  );
};

export default Notes;
