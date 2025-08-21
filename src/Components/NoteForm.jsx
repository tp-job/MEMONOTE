import { useState, useEffect } from "react";

export default function NoteForm({ note, onSave, onCancel }) {
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
    const renderInputField = (field, label, type = "text", placeholder = "", rows = null) => (
        <div>
            <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            {type === "textarea" ? (
                <textarea
                    id={field}
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    placeholder={placeholder}
                    rows={rows}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 resize-none"
                />
            ) : (
                <input
                    id={field}
                    type={type}
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                />
            )}
        </div>
    );

    const renderTagHelpText = () => (
        <p className="mt-1 text-xs text-gray-500">
            Separate multiple tags with commas (e.g., "sci, math, work")
        </p>
    );

    const renderFormActions = () => (
        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
            >
                {note ? "Update Note" : "Create Note"}
            </button>
        </div>
    );

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {note ? "Edit Note" : "Create New Note"}
                    </h2>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        {renderInputField("title", "Title", "text", "Enter note title...")}
                        {renderInputField("content", "Content", "textarea", "Write your note content...", 8)}
                        {renderInputField("link", "Link (optional)", "url", "https://example.com")}
                        
                        <div>
                            {renderInputField("tag", "Tags (optional)", "text", "e.g., work, personal, ideas, sci, math...")}
                            {renderTagHelpText()}
                        </div>
                    </div>
                    
                    {renderFormActions()}
                </form>
            </div>
        </div>
    );
}
