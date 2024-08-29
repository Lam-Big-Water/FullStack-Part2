type InitData = {id: number; content: string; important: boolean;}
interface NoteProps {
  note: InitData;
  toggleImportance: () => void;
}
const Note = ({ note, toggleImportance }: NoteProps) => {
  const label = note.important ? 'make not important' : 'make important'
    return (
      <li>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
      </li>
    )
  }
  
export default Note