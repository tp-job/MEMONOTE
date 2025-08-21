import { useState } from 'react';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import NoteForm from '../Components/NoteForm';
import NoteViewer from '../Components/NoteViewer';
import Sidebar from '../Components/Sidebar';
import { useLocalStorage } from '../Hooks/useLocalStorage';

const NotesPage = () => {
    // State management
    const [showForm, setShowForm] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    // Custom hook for note operations
    const { 
        notes, 
        addNote, 
        updateNote, 
        deleteNote, 
        searchNotes, 
        getNotesWithLinks,
        getAllTags,
        getNotesWithTags,
        getNotesWithoutTags,
        getNotesByTag
    } = useLocalStorage();

    // Filter logic
    const getFilteredNotes = () => {
        if (searchQuery) {
            return searchNotes(searchQuery);
        }

        return notes.filter(note => {
            switch (activeFilter) {
                case 'all':
                    return true;
                case 'tagged':
                    return getNotesWithTags().some(n => n.id === note.id);
                case 'untagged':
                    return getNotesWithoutTags().some(n => n.id === note.id);
                case 'with-links':
                    return note.link && note.link.trim() !== '';
                default:
                    return getNotesByTag(activeFilter).some(n => n.id === note.id);
            }
        });
    };

    // Event handlers
    const handleAddNote = () => {
        setEditingNote(null);
        setShowForm(true);
    };

    const handleEditNote = (note) => {
        setEditingNote(note);
        setShowForm(true);
    };

    const handleSaveNote = (noteData) => {
        if (editingNote) {
            updateNote(editingNote.id, noteData);
            if (selectedNote && selectedNote.id === editingNote.id) {
                setSelectedNote({ ...selectedNote, ...noteData });
            }
        } else {
            const newNote = addNote(noteData);
            setSelectedNote(newNote);
        }
        setShowForm(false);
        setEditingNote(null);
    };

    const handleDeleteNote = (id) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            deleteNote(id);
            if (selectedNote && selectedNote.id === id) {
                setSelectedNote(null);
            }
        }
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingNote(null);
    };

    const handleNoteSelect = (note) => {
        setSelectedNote(note);
    };

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setSelectedNote(null);
    };

    // Render helpers
    const renderNoteList = () => {
        const filteredNotes = getFilteredNotes();

        if (filteredNotes.length === 0) {
            return (
                <div className="p-8 text-center text-gray-500">
                    <p>No notes found</p>
                </div>
            );
        }

        return (
            <div className="divide-y divide-gray-100">
                {filteredNotes.map((note) => (
                    <div
                        key={note.id}
                        onClick={() => handleNoteSelect(note)}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${
                            selectedNote?.id === note.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                        }`}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="font-medium text-gray-900 line-clamp-1 flex-1">
                                {note.title}
                            </h3>
                            <div className="flex items-center space-x-1 ml-2">
                                {note.link && (
                                    <span className="text-blue-500" title="Has link">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                    </span>
                                )}
                                <span className="text-xs text-gray-400">
                                    {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {note.content}
                        </p>

                        <div className="flex items-center space-x-2">
                            {note.tag && (
                                <div className="flex flex-wrap gap-1">
                                    {note.tag.split(',').map((tag, index) => (
                                        <span 
                                            key={index}
                                            className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full"
                                        >
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}
                            {note.link && (
                                <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                    Link
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderEmptyState = () => (
        <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Select a note</h3>
                <p>Choose a note from the list to view its content</p>
            </div>
        </div>
    );

    return (
        <div className="h-screen bg-gray-50 flex flex-col">
            <Header onAdd={handleAddNote} />

            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar */}
                <Sidebar
                    activeFilter={activeFilter}
                    onFilterChange={handleFilterChange}
                    noteCount={notes.length}
                    tags={getAllTags()}
                    notesWithLinks={getNotesWithLinks().length}
                    notesWithTags={getNotesWithTags().length}
                />

                {/* Middle Panel - Note List */}
                <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-200">
                        <SearchBar
                            search={searchQuery}
                            setSearch={setSearchQuery}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {renderNoteList()}
                    </div>
                </div>

                {/* Right Panel - Note Content */}
                <div className="flex-1 bg-white flex flex-col">
                    {selectedNote ? (
                        <NoteViewer
                            note={selectedNote}
                            onEdit={handleEditNote}
                            onDelete={handleDeleteNote}
                        />
                    ) : (
                        renderEmptyState()
                    )}
                </div>
            </div>

            {showForm && (
                <NoteForm
                    note={editingNote}
                    onSave={handleSaveNote}
                    onCancel={handleCancelForm}
                />
            )}
        </div>
    );
};

export default NotesPage;
