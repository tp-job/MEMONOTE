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
            <label htmlFor={field} className="flex items-center gap-2 mb-3 text-sm font-semibold tracking-wide text-light-text dark:text-dark-text">
                {icon && (
                    <div className="w-4 h-4 transition-colors duration-200 text-light-text-secondary dark:text-dark-text-secondary group-focus-within:text-lush-violet dark:group-focus-within:text-velvet-violet">
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
                    className="w-full px-4 py-3 transition-all duration-300 border-2 resize-none bg-light-surface-2 dark:bg-dark-surface-2 border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:bg-light-surface dark:focus:bg-dark-surface focus:border-lush-violet dark:focus:border-velvet-violet focus:ring-4 focus:ring-lush-violet/10 dark:focus:ring-velvet-violet/10 text-light-text dark:text-dark-text placeholder:text-light-text-secondary dark:placeholder:text-dark-text-secondary hover:border-light-accent dark:hover:border-dark-accent"
                />
            ) : (
                <input
                    id={field}
                    type={type}
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 transition-all duration-300 border-2 bg-light-surface-2 dark:bg-dark-surface-2 border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:bg-light-surface dark:focus:bg-dark-surface focus:border-lush-violet dark:focus:border-velvet-violet focus:ring-4 focus:ring-lush-violet/10 dark:focus:ring-velvet-violet/10 text-light-text dark:text-dark-text placeholder:text-light-text-secondary dark:placeholder:text-dark-text-secondary hover:border-light-accent dark:hover:border-dark-accent"
                />
            )}
        </div>
    );

    const renderTagHelpText = () => (
        <div className="flex items-center gap-2 px-3 py-2 mt-2 text-xs border rounded-lg text-light-text-secondary dark:text-dark-text-secondary bg-lush-violet/10 dark:bg-lush-violet/20 border-lush-violet/20 dark:border-lush-violet/30">
            <i class="ri-information-2-fill"></i>
            <span>Separate multiple tags with commas (e.g., "sci, math, work")</span>
        </div>
    );

    const renderFormActions = () => (
        <div className="flex justify-end gap-3 pt-6 mt-8 border-t border-gradient-to-r from-transparent via-light-border dark:via-dark-border to-transparent">
            <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 border-2 group text-light-text-secondary dark:text-dark-text-secondary bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border rounded-xl hover:bg-light-surface-2 dark:hover:bg-dark-surface-2 hover:border-light-accent dark:hover:border-dark-accent focus:outline-none focus:ring-4 focus:ring-light-accent/20 dark:focus:ring-dark-accent/20 hover:scale-105 active:scale-95"
            >
                <i class="ri-close-large-fill"></i>
                Cancel
            </button>
            <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition-all duration-300 border-2 border-transparent shadow-lg group bg-gradient-to-r from-lush-violet to-velvet-violet rounded-xl hover:from-velvet-violet hover:to-elegant-violet focus:outline-none focus:ring-4 focus:ring-lush-violet/30 dark:focus:ring-velvet-violet/30 hover:shadow-xl hover:scale-105 active:scale-95"
            >
                <i class="ri-check-fill"></i>
                {note ? "Update Note" : "Create Note"}
            </button>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-light-surface/95 dark:bg-dark-surface/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-light-border/20 dark:border-dark-border/20">
                {/* Header with gradient */}
                <div className="relative px-8 py-6 bg-gradient-to-r from-lush-violet via-velvet-violet to-elegant-violet">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative flex items-center justify-between">
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
                            <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-xl backdrop-blur-sm">
                                <i class="ri-edit-box-line"></i>
                            </div>
                            {note ? "Edit Note" : "Create New Note"}
                        </h2>
                        <button
                            onClick={handleCancel}
                            className="flex items-center justify-center w-8 h-8 transition-all duration-200 bg-white/20 rounded-xl hover:bg-white/30 backdrop-blur-sm"
                        >
                            <i class="ri-close-large-line"></i>
                        </button>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
                    <div className="space-y-6">
                        {renderInputField("title", "Title", "text", "Enter note title...", null, 
                            <i class="ri-price-tag-3-line"></i>
                        )}
                        
                        {renderInputField("content", "Content", "textarea", "Write your note content...", 8,
                            <i class="ri-file-text-line"></i>
                        )}
                        
                        {renderInputField("link", "Link (optional)", "url", "https://example.com", null,
                            <i class="ri-links-line"></i>
                        )}
                        
                        <div>
                            {renderInputField("tag", "Tags (optional)", "text", "e.g., work, personal, ideas, sci, math...", null,
                                <i class="ri-price-tag-3-line"></i>
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