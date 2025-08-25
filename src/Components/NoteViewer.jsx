import { formatDate } from "../Utils/dateFormat";

export default function NoteViewer({ note, onEdit, onDelete }) {
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

    const noteTags = parseTags(note.tag);

    // Render helpers
    const renderActionButtons = () => (
        <div className="flex items-center space-x-3">
            <button
                onClick={() => onDelete(note.id)}
                className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-lush-peach hover:bg-lush-peach/10 dark:hover:bg-lush-peach/20 rounded-lg transition-colors duration-200"
                title="Delete note"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
            
            <button
                onClick={() => onEdit(note)}
                className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-lush-violet dark:hover:text-velvet-violet hover:bg-lush-violet/10 dark:hover:bg-velvet-violet/20 rounded-lg transition-colors duration-200"
                title="Edit note"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>
            
            <div className="w-px h-6 bg-light-border dark:bg-dark-border"></div>
            
            <button className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:bg-light-surface-2 dark:hover:bg-dark-surface-2 rounded-lg transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
            </button>
            
            <button className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:bg-light-surface-2 dark:hover:bg-dark-surface-2 rounded-lg transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
            </button>
        </div>
    );

    const renderUserAvatar = () => (
        <div className="flex items-center space-x-3">
            <div className="relative">
                <div className="w-8 h-8 bg-lush-violet dark:bg-velvet-violet rounded-full flex items-center justify-center text-white text-sm font-medium">
                    U
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-lush-peach rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">1</span>
                </div>
            </div>
        </div>
    );

    const renderNoteHeader = () => (
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-lush-violet dark:bg-velvet-violet rounded-full flex items-center justify-center text-white font-medium">
                    {note.title.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Note created by User</p>
                    <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">{note.title}</h1>
                </div>
            </div>
            
            <div className="flex items-center space-x-2">
                <button className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:bg-light-surface-2 dark:hover:bg-dark-surface-2 rounded-lg transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:bg-light-surface-2 dark:hover:bg-dark-surface-2 rounded-lg transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Link
                </span>
            )}
        </div>
    );

    const renderLinkSection = () => (
    note.link && (
        <div className="group mt-6 p-5 bg-gradient-to-br from-lush-violet/5 via-velvet-violet/5 to-elegant-violet/5 dark:from-lush-violet/10 dark:via-velvet-violet/10 dark:to-elegant-violet/10 rounded-2xl border border-lush-violet/20 dark:border-lush-violet/30 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-lush-violet dark:bg-velvet-violet rounded-full animate-pulse"></div>
                        <h3 className="text-sm font-semibold text-light-text dark:text-dark-text tracking-wide uppercase">
                            Related Link
                        </h3>
                    </div>
                    <div className="flex items-center gap-2 text-lush-violet dark:text-velvet-violet">
                        <svg className="w-4 h-4 text-lush-violet dark:text-velvet-violet flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <p className="text-sm font-medium truncate hover:text-velvet-violet dark:hover:text-elegant-violet transition-colors duration-200">
                            {note.link}
                        </p>
                    </div>
                </div>
                
                <button
                    onClick={() => handleLinkClick(note.link)}
                    className="flex-shrink-0 group/btn inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-lush-violet to-velvet-violet rounded-xl shadow-lg hover:shadow-xl hover:from-velvet-violet hover:to-elegant-violet focus:outline-none focus:ring-4 focus:ring-lush-violet/25 dark:focus:ring-velvet-violet/25 transform hover:scale-105 transition-all duration-300 active:scale-95"
                >
                    <svg className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="group-hover/btn:translate-x-0.5 transition-transform duration-300">
                        Open
                    </span>
                </button>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
        </div>
    )
);

    return (
        <div className="flex-1 flex flex-col">
            {/* Top Bar */}
            <div className="flex items-center justify-between p-4 border-b border-light-border dark:border-dark-border">
                {renderActionButtons()}
                {renderUserAvatar()}
            </div>

            {/* Note Content */}
            <div className="flex-1 overflow-y-auto p-6">
                {/* Note Header */}
                <div className="mb-6">
                    {renderNoteHeader()}
                    
                    <div className="flex items-center justify-between text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        <span>{formatDate(note.createdAt)}</span>
                        {renderTags()}
                    </div>
                </div>

                {/* Note Body */}
                <div className="prose max-w-none">
                    <div className="text-light-text dark:text-dark-text whitespace-pre-wrap leading-relaxed">
                        {note.content}
                    </div>
                    
                    {renderLinkSection()}
                </div>
            </div>
        </div>
    );
}
