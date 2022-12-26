import React from "react";
import AddNote from "./AddNote";
import Notes from "./Notes";

const Home = ({showAlert}) => {
    return (
        <div>
            <Notes showAlert={showAlert} />
        </div>
    );
};

export default Home;
