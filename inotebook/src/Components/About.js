import React, { useContext, useEffect } from "react";
import NoteContext from "../Context/notes/noteContext";

const About = () => {
    const a = useContext(NoteContext);

    useEffect(() => {
        a.update()
    }, [])
    return (
        <div>
            <h1>This is me {a.state.name} and my class is {a.state.class}</h1>
        </div>
    );
};

export default About;
