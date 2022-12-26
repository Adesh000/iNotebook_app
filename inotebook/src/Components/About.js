import React, { useContext, useEffect } from "react";
import NoteContext from "../Context/notes/noteContext";

const About = () => {
    const a = useContext(NoteContext);

    
    return (
        <div>
            <h1>Adesh About</h1>
        </div>
    );
};

export default About;
