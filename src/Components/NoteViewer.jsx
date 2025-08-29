import { formatDate } from "../Utils/dateFormat";
import { useState, useEffect } from "react";

const NoteViewer = ({ note, onEdit, onDelete, notes, setSelectedNote }) => {
    // User color state
    const [userColor, setUserColor] = useState(() => {
        const saved = localStorage.getItem('userColor');
        return saved || 'lush-violet';
    });

    // Available user colors
    const userColors = [
        { name: 'lush-violet', bg: 'bg-lush-violet', darkBg: 'dark:bg-velvet-violet', label: 'Violet' },
        { name: 'lush-peach', bg: 'bg-lush-peach', darkBg: 'dark:bg-misty-peach', label: 'Peach' },
        { name: 'elegant-violet', bg: 'bg-elegant-violet', darkBg: 'dark:bg-elegant-violet', label: 'Light Violet' },
        { name: 'misty-lavender', bg: 'bg-misty-lavender', darkBg: 'dark:bg-misty-lavender', label: 'Lavender' },
        { name: 'charcoal-grey', bg: 'bg-charcoal-grey', darkBg: 'dark:bg-charcoal-grey', label: 'Grey' },
        { name: 'deep-night', bg: 'bg-deep-night', darkBg: 'dark:bg-deep-night', label: 'Dark' },
    ];

    // Save user color to localStorage
    useEffect(() => {
        localStorage.setItem('userColor', userColor);
    }, [userColor]);

    // Helper functions
    const parseTags = (tagString) => {
        if (!tagString || !tagString.trim()) return [];
        return tagString
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);
    };

    const handleLinkClick = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleColorChange = (colorName) => {
        setUserColor(colorName);
    };

    const getCurrentColor = () => {
        return userColors.find(color => color.name === userColor) || userColors[0];
    };

    const noteTags = parseTags(note.tag);
    const currentColor = getCurrentColor();

    const currentIndex = notes.findIndex(n => n.id === note.id);

    const handlePreviousNote = () => {
        if (currentIndex > 0) {
            setSelectedNote(notes[currentIndex - 1]);
        }
    };

    const handleNextNote = () => {
        if (currentIndex < notes.length - 1) {
            setSelectedNote(notes[currentIndex + 1]);
        }
    };

    // Render helpers
    const renderActionButtons = () => (
        <div className="flex items-center space-x-3">
            <button
                onClick={() => onDelete(note.id)}
                className="p-2 transition-colors duration-200 rounded-lg text-light-text-secondary dark:text-dark-text-secondary hover:text-lush-peach hover:bg-lush-peach/10 dark:hover:bg-lush-peach/20"
                title="Delete note"
            >
                <i class="ri-delete-bin-line"></i>
            </button>

            <button
                onClick={() => onEdit(note)}
                className="p-2 transition-colors duration-200 rounded-lg text-light-text-secondary dark:text-dark-text-secondary hover:text-lush-violet dark:hover:text-velvet-violet hover:bg-lush-violet/10 dark:hover:bg-velvet-violet/20"
                title="Edit note"
            >
                <i class="ri-edit-2-line"></i>
            </button>

            <span className="text-light-text-secondary dark:text-dark-text-secondary">|</span>

            <button
                onClick={() => onEdit(note)}
                className="p-2 transition-colors duration-200 rounded-lg text-light-text-secondary dark:text-dark-text-secondary hover:text-lush-violet dark:hover:text-velvet-violet hover:bg-lush-violet/10 dark:hover:bg-velvet-violet/20"
                title="Edit note"
            >
                <i class="ri-share-line"></i>
            </button>

            <button
                onClick={() => onEdit(note)}
                className="p-2 transition-colors duration-200 rounded-lg text-light-text-secondary dark:text-dark-text-secondary hover:text-lush-violet dark:hover:text-velvet-violet hover:bg-lush-violet/10 dark:hover:bg-velvet-violet/20"
                title="Edit note"
            >
                <i class="ri-more-2-line"></i>
            </button>
        </div>
    );

    const renderUserAvatar = () => (
        <div className="flex items-center space-x-3">
            <div className="relative group">
                <div className={`flex items-center justify-center w-8 h-8 text-sm font-medium text-white rounded-full ${currentColor.bg} ${currentColor.darkBg} transition-all duration-300 cursor-pointer hover:scale-110`}>
                    U
                </div>
                <div className="absolute flex items-center justify-center w-4 h-4 rounded-full -top-1 -right-1 bg-lush-peach">
                    <span className="text-xs text-white">1</span>
                </div>

                {/* Color picker dropdown */}
                <div className="absolute right-0 z-50 invisible w-64 mt-2 transition-all duration-300 border shadow-lg opacity-0 top-full bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border rounded-xl group-hover:opacity-100 group-hover:visible">
                    <div className="p-4">
                        <h3 className="flex items-center gap-2 mb-4 text-base font-semibold text-light-text dark:text-dark-text">
                            <i class="ri-repeat-2-fill"></i>
                            Choose User Color
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                            {userColors.map((color) => (
                                <button
                                    key={color.name}
                                    onClick={() => handleColorChange(color.name)}
                                    className={`flex items-center gap-3 p-3 rounded-xl text-sm transition-all duration-200 ${userColor === color.name
                                            ? 'bg-light-surface-2 dark:bg-dark-surface-2 text-light-text dark:text-dark-text ring-2 ring-lush-violet/20 dark:ring-velvet-violet/20'
                                            : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-surface-2 dark:hover:bg-dark-surface-2 hover:text-light-text dark:hover:text-dark-text'
                                        }`}
                                >
                                    <div className={`w-6 h-6 rounded-full ${color.bg} ${color.darkBg} shadow-sm`}></div>
                                    <span className="font-medium">{color.label}</span>
                                    {userColor === color.name && (
                                        <i class="ri-check-fill"></i>
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className="pt-3 mt-4 border-t border-light-border dark:border-dark-border">
                            <p className="text-xs text-center text-light-text-secondary dark:text-dark-text-secondary">
                                Color preference will be saved automatically
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderNoteHeader = () => (
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
                <div className={`flex items-center justify-center w-10 h-10 font-medium text-white rounded-full ${currentColor.bg} ${currentColor.darkBg} transition-all duration-300`}>
                    {note.title.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h1 className="text-xl font-bold text-light-text dark:text-dark-text">{note.title}</h1>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <button onClick={handlePreviousNote} className="p-2 transition-colors duration-200 rounded-lg text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:bg-light-surface-2 dark:hover:bg-dark-surface-2">
                    <i class="ri-arrow-left-s-line"></i>
                </button>
                <button onClick={handleNextNote} className="p-2 transition-colors duration-200 rounded-lg text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:bg-light-surface-2 dark:hover:bg-dark-surface-2">
                    <i class="ri-arrow-right-s-line"></i>
                </button>
            </div>
        </div>
    );

    const renderTags = () => (
        <div className="flex items-center space-x-2">
            {noteTags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {noteTags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-lush-violet/10 dark:bg-lush-violet/20 text-lush-violet dark:text-velvet-violet"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
            {note.link && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-velvet-violet/10 dark:bg-velvet-violet/20 text-velvet-violet dark:text-elegant-violet">
                    <i class="ri-links-line mr-0.5"></i>
                    Link
                </span>
            )}
        </div>
    );

    const renderLinkSection = () => (
        note.link && (
            <div className="p-5 mt-6 transition-all duration-300 border shadow-sm group bg-gradient-to-br from-lush-violet/5 via-velvet-violet/5 to-elegant-violet/5 dark:from-lush-violet/10 dark:via-velvet-violet/10 dark:to-elegant-violet/10 rounded-2xl border-lush-violet/20 dark:border-lush-violet/30 hover:shadow-md backdrop-blur-sm">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-lush-violet dark:bg-velvet-violet animate-pulse"></div>
                            <h3 className="text-sm font-semibold tracking-wide uppercase text-light-text dark:text-dark-text">
                                Related Link
                            </h3>
                        </div>
                        <div className="flex items-center gap-2 text-lush-violet dark:text-velvet-violet">
                            <i class="ri-links-line"></i>
                            <p className="text-sm font-medium truncate transition-colors duration-200 hover:text-velvet-violet dark:hover:text-elegant-violet">
                                {note.link}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => handleLinkClick(note.link)}
                        className="flex-shrink-0 group/btn inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-lush-violet to-velvet-violet rounded-xl shadow-lg hover:shadow-xl hover:from-velvet-violet hover:to-elegant-violet focus:outline-none focus:ring-4 focus:ring-lush-violet/25 dark:focus:ring-velvet-violet/25 transform hover:scale-105 transition-all duration-300 active:scale-95"
                    >
                        <i class="ri-external-link-line"></i>
                        <span className="group-hover/btn:translate-x-0.5 transition-transform duration-300">
                            Open
                        </span>
                    </button>
                </div>

                {/* Decorative elements */}
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:opacity-100 rounded-2xl"></div>
            </div>
        )
    );

    return (
        <div className="flex flex-col flex-1">
            {/* Top Bar */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-light-border dark:border-dark-border">
                {renderActionButtons()}
                {renderUserAvatar()}
            </div>

            {/* Note Content */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                {/* Note Header */}
                <div className="mb-4 sm:mb-6">
                    {renderNoteHeader()}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        <span>{formatDate(note.createdAt)}</span>
                        {renderTags()}
                    </div>
                </div>

                {/* Note Body */}
                <div className="prose max-w-none">
                    <div className="leading-relaxed whitespace-pre-wrap text-light-text dark:text-dark-text">
                        {note.content}
                    </div>

                    {renderLinkSection()}
                </div>
            </div>
        </div>
    );
}

export default NoteViewer;