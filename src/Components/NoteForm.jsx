import { useState, useEffect } from "react";

export default function NoteForm({ note, onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");

  // Initialize form with note data if editing
  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
      setTag(note.tag || "");
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;
    
    const noteData = {
      title: title.trim() || "Untitled",
      content: content.trim(),
      tag: tag.trim()
    };

    onSave(noteData);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setTag("");
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

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
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note content..."
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 resize-none"
              />
            </div>
            
            <div>
              <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-2">
                Tag (optional)
              </label>
              <input
                id="tag"
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="e.g., work, personal, ideas..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
              />
            </div>
          </div>
          
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
        </form>
      </div>
    </div>
  );
}
