import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import AddNote from "./AddNote";
import NotesItem from "./NotesItem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });

  useEffect(() => {
    console.log("use effect is not working");
    getNotes();
  }, []);

  const ref = useRef(null);

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag})
  };

  const handleClick = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <div>
      <AddNote />

      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row mb-3">
                  <label htmlFor="title" className="col-sm-2 col-form-label">
                    Title
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control"
                      id="title"
                      name="etitle"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="description"
                    className="col-sm-2 col-form-label"
                  >
                    Description
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="edescription"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="tag" className="col-sm-2 col-form-label">
                    Tag
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="tag"
                      name="etag"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-10 offset-sm-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="gridCheck1"
                      />
                      <label className="form-check-label" htmlFor="gridCheck1">
                        Example checkbox
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.map((note) => {
          return <NotesItem updateNote={updateNote} note={note} />;
        })}
      </div>
    </div>
  );
};

export default Notes;
