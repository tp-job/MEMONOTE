import { useState, useEffect } from 'react';

const STORAGE_KEY = 'notes';

// Helper functions
const parseTags = (tagString) => {
    if (!tagString || !tagString.trim()) return [];
    return tagString
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
};

const noteHasTag = (note, targetTag) => {
    const noteTags = parseTags(note.tag);
    return noteTags.some(tag => tag.toLowerCase() === targetTag.toLowerCase());
};

const isValidUrl = (string) => {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};

const createNote = (noteData) => ({
    id: Date.now(),
    title: noteData.title || 'Untitled',
    content: noteData.content || '',
    tag: noteData.tag || '',
    link: noteData.link || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
});

export const useLocalStorage = () => {
    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem(STORAGE_KEY);
        return savedNotes ? JSON.parse(savedNotes) : [];
    });

    // Save to localStorage whenever notes change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }, [notes]);

    // Note CRUD operations
    const addNote = (noteData) => {
        const newNote = createNote(noteData);
        setNotes(prev => [newNote, ...prev]);
        return newNote;
    };

    const updateNote = (id, updates) => {
        setNotes(prev =>
            prev.map(note =>
                note.id === id
                    ? { ...note, ...updates, updatedAt: new Date().toISOString() }
                    : note
            )
        );
    };

    const deleteNote = (id) => {
        setNotes(prev => prev.filter(note => note.id !== id));
    };

    // Search functionality
    const searchNotes = (query) => {
        const searchTerm = query.toLowerCase();
        return notes.filter(note => {
            const noteTags = parseTags(note.tag);
            return note.title.toLowerCase().includes(searchTerm) ||
                note.content.toLowerCase().includes(searchTerm) ||
                noteTags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                (note.link && note.link.toLowerCase().includes(searchTerm));
        });
    };

    // Tag-related queries
    const getNotesByTag = (tag) => {
        return notes.filter(note => noteHasTag(note, tag));
    };

    const getAllTags = () => {
        const allTags = new Set();
        notes.forEach(note => {
            const noteTags = parseTags(note.tag);
            noteTags.forEach(tag => allTags.add(tag));
        });
        return Array.from(allTags).sort();
    };

    const getNotesWithTags = () => {
        return notes.filter(note => parseTags(note.tag).length > 0);
    };

    const getNotesWithoutTags = () => {
        return notes.filter(note => parseTags(note.tag).length === 0);
    };

    // Link-related queries
    const getNotesWithLinks = () => {
        return notes.filter(note => note.link && isValidUrl(note.link));
    };

    return {
        notes,
        addNote,
        updateNote,
        deleteNote,
        searchNotes,
        isValidUrl,
        getNotesWithLinks,
        getNotesByTag,
        getAllTags,
        getNotesWithTags,
        getNotesWithoutTags,
        parseTags
    };
};