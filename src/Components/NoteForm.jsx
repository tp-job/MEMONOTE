import { useState, useEffect } from "react";

const NoteForm = ({ note, onSave, onCancel }) => {
    // Form state
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        tag: "",
        link: ""
    });

    // Initialize form with note data if editing
    useEffect(() => {
        if (note) {
            setFormData({
                title: note.title || "",
                content: note.content || "",
                tag: note.tag || "",
                link: note.link || ""
            });
        }
    }, [note]);

    // Form handlers
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim() && !formData.content.trim()) return;
        
        const noteData = {
            title: formData.title.trim() || "Untitled",
            content: formData.content.trim(),
            tag: formData.tag.trim(),
            link: formData.link.trim()
        };

        onSave(noteData);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            title: "",
            content: "",
            tag: "",
            link: ""
        });
    };

    const handleCancel = () => {
        resetForm();
        onCancel();
    };

    // Render helpers
    const renderInputField = (field, label, type = "text", placeholder = "", rows = null, icon = null) => (
        <div className="group">
            <label htmlFor={field} className="flex items-center gap-2 text-sm font-semibold text-light-text dark:text-dark-text mb-3 tracking-wide">
                {icon && (
                    <div className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary group-focus-within:text-lush-violet dark:group-focus-within:text-velvet-violet transition-colors duration-200">
                        {icon}
                    </div>
                )}
                {label}
            </label>
            {type === "textarea" ? (
                <textarea
                    id={field}
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    placeholder={placeholder}
                    rows={rows}
                    className="w-full px-4 py-3 bg-light-surface-2 dark:bg-dark-surface-2 border-2 border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:bg-light-surface dark:focus:bg-dark-surface focus:border-lush-violet dark:focus:border-velvet-violet focus:ring-4 focus:ring-lush-violet/10 dark:focus:ring-velvet-violet/10 transition-all duration-300 resize-none text-light-text dark:text-dark-text placeholder:text-light-text-secondary dark:placeholder:text-dark-text-secondary hover:border-light-accent dark:hover:border-dark-accent"
                />
            ) : (
                <input
                    id={field}
                    type={type}
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 bg-light-surface-2 dark:bg-dark-surface-2 border-2 border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:bg-light-surface dark:focus:bg-dark-surface focus:border-lush-violet dark:focus:border-velvet-violet focus:ring-4 focus:ring-lush-violet/10 dark:focus:ring-velvet-violet/10 transition-all duration-300 text-light-text dark:text-dark-text placeholder:text-light-text-secondary dark:placeholder:text-dark-text-secondary hover:border-light-accent dark:hover:border-dark-accent"
                />
            )}
        </div>
    );

    const renderTagHelpText = () => (
        <div className="flex items-center gap-2 mt-2 text-xs text-light-text-secondary dark:text-dark-text-secondary bg-lush-violet/10 dark:bg-lush-violet/20 px-3 py-2 rounded-lg border border-lush-violet/20 dark:border-lush-violet/30">
            <svg className="w-3 h-3 text-lush-violet dark:text-velvet-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Separate multiple tags with commas (e.g., "sci, math, work")</span>
        </div>
    );

    const renderFormActions = () => (
        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gradient-to-r from-transparent via-light-border dark:via-dark-border to-transparent">
            <button
                type="button"
                onClick={handleCancel}
                className="group px-6 py-3 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary bg-light-surface dark:bg-dark-surface border-2 border-light-border dark:border-dark-border rounded-xl hover:bg-light-surface-2 dark:hover:bg-dark-surface-2 hover:border-light-accent dark:hover:border-dark-accent focus:outline-none focus:ring-4 focus:ring-light-accent/20 dark:focus:ring-dark-accent/20 transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95"
            >
                <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
            </button>
            <button
                type="submit"
                className="group px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-lush-violet to-velvet-violet border-2 border-transparent rounded-xl hover:from-velvet-violet hover:to-elegant-violet focus:outline-none focus:ring-4 focus:ring-lush-violet/30 dark:focus:ring-velvet-violet/30 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 hover:scale-105 active:scale-95"
            >
                <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {note ? "Update Note" : "Create Note"}
            </button>
        </div>
    );

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
            <div className="bg-light-surface/95 dark:bg-dark-surface/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-light-border/20 dark:border-dark-border/20">
                {/* Header with gradient */}
                <div className="relative px-8 py-6 bg-gradient-to-r from-lush-violet via-velvet-violet to-elegant-violet">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            {note ? "Edit Note" : "Create New Note"}
                        </h2>
                        <button
                            onClick={handleCancel}
                            className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-200 backdrop-blur-sm"
                        >
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
                    <div className="space-y-6">
                        {renderInputField("title", "Title", "text", "Enter note title...", null, 
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                        )}
                        
                        {renderInputField("content", "Content", "textarea", "Write your note content...", 8,
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        )}
                        
                        {renderInputField("link", "Link (optional)", "url", "https://example.com", null,
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        )}
                        
                        <div>
                            {renderInputField("tag", "Tags (optional)", "text", "e.g., work, personal, ideas, sci, math...", null,
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                            )}
                            {renderTagHelpText()}
                        </div>
                    </div>
                    
                    {renderFormActions()}
                </form>
            </div>
        </div>
    );
}

export default NoteForm;