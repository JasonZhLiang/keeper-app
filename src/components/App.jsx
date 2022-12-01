import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { notes } from "../nodes";
import { useState } from "react";
// // react can't use node native fs
// import { readFile, writeFile, writeFileSync, promises as fsPromises } from 'fs';

function App() {
    const [notesArr, setNotesArr] = useState(notes);
    // // write file back to notes.js
    // readFile('../nodes.js', 'utf-8', function (err, contents) {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }

    //     // 👇️ match string case-insensitively 👇️
    //     const replaced = contents.replace(/prev/gi, notesArr);

    //     writeFile('./example.txt', replaced, 'utf-8', function (err) {
    //         console.log(err);
    //     });
    // });
    function addNote(event, noteObj) {
        noteObj.key = notesArr.length + 1;
        setNotesArr(prev => {
            return [...prev, noteObj]
        });
        // this line is crutial, without it, page will get refreshed 
        event.preventDefault();
    }

    function deleteNote(id) {
        // don't have to use index as id to delete item from array, can use key as well
        setNotesArr((prevItems) => {
            return prevItems.filter((item, index) => {
                return index !== id;
            });
        });
    }

    return (
        <div>
            <Header />
            <CreateArea addNote={addNote} />
            <Footer />
            {notesArr.map((note, index) => (
                <Note
                    deleteNote={deleteNote}
                    id={index}
                    key={note.key}
                    title={note.title}
                    content={note.content}
                />))}
        </div>
    );
}
export default App;