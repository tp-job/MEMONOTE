export default function Sidebar({ activeFilter, onFilterChange, noteCount, tags }) {
  const filters = [
    { id: 'all', label: 'All Notes', count: noteCount },
    { id: 'tagged', label: 'Tagged', count: tags.length },
    { id: 'untagged', label: 'Untagged', count: noteCount - tags.length }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* New Note Button */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => onFilterChange('all')}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Note
        </button>
      </div>

      {/* Filters */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Filters</h3>
          <div className="space-y-1">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors duration-150 ${
                  activeFilter === filter.id
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-sm">{filter.label}</span>
                {filter.count > 0 && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activeFilter === filter.id
                      ? 'bg-teal-100 text-teal-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {filter.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Tags</h3>
            <div className="space-y-1">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onFilterChange(tag)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors duration-150 ${
                    activeFilter === tag
                      ? 'bg-purple-50 text-purple-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    tag === 'Personal' ? 'bg-orange-400' :
                    tag === 'Work' ? 'bg-purple-400' :
                    tag === 'Friends' ? 'bg-green-400' :
                    'bg-gray-400'
                  }`}></div>
                  <span className="text-sm">{tag}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Status */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            Ready
          </div>
        </div>
      </div>
    </div>
  );
}
