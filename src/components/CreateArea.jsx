import { useState } from "react";

function CreateArea(props) {
    const [noteObj, setNoteObj] = useState({
        title: "",
        content: ""
    })
    function handleChange(event) {
        const { name, value } = event.target;
        setNoteObj(prev => {
            return { ...prev, [name]: value }
        })
    }
    return (
        <div>
            <form>
                <input name="title" placeholder="Title" onChange={handleChange} value={noteObj.title} />
                <textarea name="content" placeholder="Take a note..." onChange={handleChange} value={noteObj.content} rows="3" />
                <button onClick={(event) => {
                    props.addNote(event, noteObj);
                    // clear the fields
                    setNoteObj({
                        title: "",
                        content: ""
                    });
                }}>Add</button>
            </form>
        </div>
    );
}

export default CreateArea;
