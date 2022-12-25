import React from "react";

const NotesItem = ({ note }) => {
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
                        <i class="fa-solid fa-trash-can mx-2"></i>
                        <i class="fa-solid fa-pen-to-square mx-2"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotesItem;
