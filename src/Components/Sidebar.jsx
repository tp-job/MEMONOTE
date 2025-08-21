export default function Sidebar({ activeFilter, onFilterChange, noteCount, tags, notesWithLinks, notesWithTags }) {
    // Filter configuration
    const filters = [
        { id: 'all', label: 'All Notes', count: noteCount },
        { id: 'tagged', label: 'Tagged', count: notesWithTags || 0 },
        { id: 'untagged', label: 'Untagged', count: noteCount - (notesWithTags || 0) },
        { id: 'with-links', label: 'With Links', count: notesWithLinks || 0 }
    ];

    // Helper functions
    const getFilterButtonClass = (filterId) => {
        const baseClass = "w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors duration-150";
        return activeFilter === filterId
            ? `${baseClass} bg-teal-50 text-teal-700`
            : `${baseClass} text-gray-700 hover:bg-gray-50`;
    };

    const getCountBadgeClass = (filterId) => {
        const baseClass = "text-xs px-2 py-1 rounded-full";
        return activeFilter === filterId
            ? `${baseClass} bg-teal-100 text-teal-700`
            : `${baseClass} bg-gray-100 text-gray-600`;
    };

    const getTagButtonClass = (tag) => {
        const baseClass = "w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors duration-150";
        return activeFilter === tag
            ? `${baseClass} bg-purple-50 text-purple-700`
            : `${baseClass} text-gray-700 hover:bg-gray-50`;
    };

    const getTagColor = (tag) => {
        const colorMap = {
            'Personal': 'bg-orange-400',
            'Work': 'bg-purple-400',
            'Friends': 'bg-green-400'
        };
        return colorMap[tag] || 'bg-gray-400';
    };

    // Render helpers
    const renderFilterButton = (filter) => (
        <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={getFilterButtonClass(filter.id)}
        >
            <div className="flex items-center">
                <span className="text-sm">{filter.label}</span>
            </div>
            {filter.count > 0 && (
                <span className={getCountBadgeClass(filter.id)}>
                    {filter.count}
                </span>
            )}
        </button>
    );

    const renderTagButton = (tag) => (
        <button
            key={tag}
            onClick={() => onFilterChange(tag)}
            className={getTagButtonClass(tag)}
        >
            <div className={`w-3 h-3 rounded-full mr-3 ${getTagColor(tag)}`}></div>
            <span className="text-sm">{tag}</span>
        </button>
    );

    const renderFilters = () => (
        <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Filters</h3>
            <div className="space-y-1">
                {filters.map(renderFilterButton)}
            </div>
        </div>
    );

    const renderTags = () => (
        tags.length > 0 && (
            <div className="p-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Tags</h3>
                <div className="space-y-1">
                    {tags.map(renderTagButton)}
                </div>
            </div>
        )
    );

    const renderStatus = () => (
        <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500">
                <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    Ready
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            {/* Filters */}
            <div className="flex-1 overflow-y-auto">
                {renderFilters()}
                {renderTags()}
            </div>
            {/* Status */}
            {renderStatus()}
        </div>
    );
}
