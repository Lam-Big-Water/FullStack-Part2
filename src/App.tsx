import {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import Note from './components/Note';
import axios from 'axios';

type InitData = {id: number; content: string; important: boolean;}

const App = () => {
  const [notes, setNotes] = useState<InitData[]>([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes').then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  
  const addNote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const noteObject: InitData = {
      content: newNote,
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }
    console.log(noteObject)

    setNotes(notes.concat(noteObject));
    setNewNote('');
  }

  const handleNoteChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value);
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return (

    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note}/>)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App