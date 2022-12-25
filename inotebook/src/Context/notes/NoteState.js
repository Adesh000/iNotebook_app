import { useEffect, useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            _id: "63a283e2ef328e3b79c34fb9",
            user: "63a2821aef328e3b79c34fb4",
            title: "new note",
            description: "Adding new note",
            tag: "Insta and Fb",
            date: "2022-12-21T03:56:18.794Z",
            __v: 0,
        },
        {
            _id: "63a7afe4b1dcf574d455e77f",
            user: "63a2821aef328e3b79c34fb4",
            title: "new note",
            description: "Adding new note",
            tag: "Insta and Fb",
            date: "2022-12-25T02:05:24.501Z",
            __v: 0,
        },
        {
            _id: "63a7b41a36603f49baf849ea",
            user: "63a2821aef328e3b79c34fb4",
            title: "new note",
            description: "Adding new note",
            tag: "Insta and Fb",
            date: "2022-12-25T02:23:22.346Z",
            __v: 0,
        },
        {
            _id: "63a7b44c36603f49baf849ec",
            user: "63a2821aef328e3b79c34fb4",
            title: "new notfghrni",
            description: "Adding new noteggt",
            tag: "Insta and Ffht",
            date: "2022-12-25T02:24:12.116Z",
            __v: 0,
        },
    ];

    const [notes, setNotes] = useState(notesInitial);

    

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
