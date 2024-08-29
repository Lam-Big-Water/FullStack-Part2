import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Note from "./components/Note";
import axios from "axios";
import noteService from "./services/notes";

type InitData = { id: number; content: string; important: boolean };

const App = () => {
  const [notes, setNotes] = useState<InitData[]>([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    noteService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes)
    });
  }, []);

  const toggleImportanceOf = (id: number) => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note?.important };

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
      .catch(error => {
        alert(
          `the note '${note?.content}' was already deleted from server`
        )
      setNotes(notes.filter(n => n.id !== id))
    })
  };

  const addNote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const noteObject: InitData = {
      content: newNote,
      important: Math.random() > 0.5,
      id: notes.length + 1,
    };

    // Sending Data to the Server
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      setNewNote("");
    });

    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  const handleNoteChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
