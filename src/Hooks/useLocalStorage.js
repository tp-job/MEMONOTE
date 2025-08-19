import { useState, useEffect } from 'react';

const STORAGE_KEY = 'notes';

export const useLocalStorage = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // Save to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  // Add note
  const addNote = (note) => {
    const newNote = {
      id: Date.now(),
      title: note.title || 'Untitled',
      content: note.content || '',
      tag: note.tag || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setNotes(prev => [newNote, ...prev]);
    return newNote;
  };

  // Update note
  const updateNote = (id, updates) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === id 
          ? { ...note, ...updates, updatedAt: new Date().toISOString() }
          : note
      )
    );
  };

  // Delete note
  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  // Search notes
  const searchNotes = (query) => {
    return notes.filter(note => 
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase()) ||
      note.tag.toLowerCase().includes(query.toLowerCase())
    );
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    searchNotes
  };
};
