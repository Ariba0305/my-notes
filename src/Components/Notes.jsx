import React, { useEffect, useRef, useState } from 'react';
import Modal from './Modal';
function Notes() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const notesData = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(notesData);
    inputRef.current?.focus();
  }, []);

  function addUpdateNote() {
    if (!title || !description) return alert('Please enter title and description!');

    setNotes(prevNotes => {
      let updatedNotes;
      if (editIndex !== null) {
        updatedNotes = prevNotes.map((note, index) =>
          index === editIndex ? { title, description } : note
        );
        setEditIndex(null);
      } else {
        updatedNotes = [...prevNotes, { title, description }];
      }
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      return updatedNotes;
    });

    setTitle('');
    setDescription('');
    inputRef.current?.focus();
  }

  function deleteNotes() {
    setNotes([]);
    localStorage.removeItem('notes');
  }

  function deleteById(id) {
    alert(`Deleting note ${id + 1}`);
    setNotes(prevNotes => {
      const updatedNotes = prevNotes.filter((_, index) => index !== id);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  }

  function editById(id) {
    setTitle(notes[id].title);
    setDescription(notes[id].description);
    setEditIndex(id);
  }

  return (
    <>
      <h1>Notes</h1>
      <div style={styles.container}>
        <input
          style={{ ...styles.inputF, width: '25%' }}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          ref={inputRef}
        />
        <textarea
          style={styles.inputF}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write notes here"
        />
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={addUpdateNote}>
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
          <button style={styles.button} onClick={deleteNotes}>Clear All</button>
        </div>
      </div>
      
      <div style={styles.noteContainer}>
        {notes.map((note, index) => (
          <div key={index} style={styles.noteCard}>
            <span style={styles.actionBtn} onClick={() => deleteById(index)}>
              <img src='https://cdn-icons-png.flaticon.com/128/14044/14044168.png' alt='delete icon' height="20px"/>
            </span>
            <span style={styles.actionBtn} onClick={() => editById(index)}>
              <img src='https://cdn-icons-png.flaticon.com/128/14204/14204341.png' alt='edit icon' height="20px"/>
            </span>
            <div style={styles.tittleContainer}><strong>{index + 1} {note.title}</strong></div>
            <p>{note.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Notes;

const styles = {
  inputF: {
    width: '45%',
    border: '1px solid black',
    padding: '5px 10px',
    textAlign: 'left',
    direction: 'ltr',
    color: 'black',
    margin: '5px',
    backgroundColor: 'white',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '10px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    margin: '5px',
    gap: '10px',
  },
  button: {
    padding: '5px',
    backgroundColor: 'blue',
    color: 'white',
    border: '1px solid black',
    cursor: 'pointer',
    width: '100px',
  },
  noteContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left',
    margin: '10px',
    gap: '10px',
  },
  noteCard: {
    border: '1px solid black',
    padding: '10px',
    backgroundColor: '#64C530',
    borderRadius: '5px',
    width: '30%',
    minWidth: '200px',
    boxSizing: 'border-box',
  },
  actionBtn: {
    cursor: 'pointer',
    float: 'right',
    marginLeft: "8px",
  },
  tittleContainer: {
    height: "30px",
    width: "80%",
    border: '1px solid black',
    padding: '1px',
    backgroundColor: 'white',
  }
};