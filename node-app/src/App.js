import { useEffect, useState } from 'react';
import './App.css';
import uuid from 'react-uuid'
import Main from './Main'
import Sidebar from './Sidebar'

function App() {
  
  // USE STATE
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );

  const [activeNote, setActiveNote] = useState(false);

  // USE EFFECT
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // ONADD NOTE
  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note" ,
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  // ON DELETE NOTE
  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  // ON UPDATE NOTE
  const onUpdateNote = (updateNote) => {
    const updateNoteArr = notes.map((note) => {
      if (note.id === updateNote.id) {
        return updateNote;
      }

      return note;
    });

    setNotes(updateNoteArr);
  };

  // GET ACTIVE NOTE
  const getActiveNote = () => {
    return notes.find(({id}) => id === activeNote);
  };
  
  return (
    <div className="App">
      <Sidebar
      notes={notes}
      onAddNote={onAddNote}
      onDeleteNote={onDeleteNote}
      activeNote={activeNote}
      setActiveNote={setActiveNote}
      />
      <Main
      activeNote={getActiveNote()}
      onUpdateNote={onUpdateNote}
      />
    </div>
  );
}

export default App;
