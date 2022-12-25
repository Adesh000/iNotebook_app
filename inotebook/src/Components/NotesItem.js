import React, {useContext} from "react";
import noteContext from "../Context/notes/noteContext";

const NotesItem = ({ note, updateNote }) => {
  const context = useContext(noteContext);
  const { deleteNote, editNote } = context;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body d-flex justify-content-between">
          <div>
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
          <div>
            <i className="fa-solid fa-trash-can mx-2" onClick={() => deleteNote(note._id)} ></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={() => updateNote(note)}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesItem;
