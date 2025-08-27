import { useState, useEffect } from 'react';

const Sidebar = ({ activeFilter, onFilterChange, noteCount, tags, notesWithLinks, notesWithTags }) => {
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
            ? `${baseClass} bg-lush-violet/10 dark:bg-lush-violet/20 text-lush-violet dark:text-velvet-violet`
            : `${baseClass} text-light-text dark:text-dark-text hover:bg-light-surface-2 dark:hover:bg-dark-surface-2`;
    };

    const getCountBadgeClass = (filterId) => {
        const baseClass = "text-xs px-2 py-1 rounded-full";
        return activeFilter === filterId
            ? `${baseClass} bg-lush-violet/20 dark:bg-lush-violet/30 text-lush-violet dark:text-velvet-violet`
            : `${baseClass} bg-light-surface-2 dark:bg-dark-surface-2 text-light-text-secondary dark:text-dark-text-secondary`;
    };

    const getTagButtonClass = (tag) => {
        const baseClass = "w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors duration-150";
        return activeFilter === tag
            ? `${baseClass} bg-elegant-violet/10 dark:bg-elegant-violet/20 text-lush-violet dark:text-velvet-violet`
            : `${baseClass} text-light-text dark:text-dark-text hover:bg-light-surface-2 dark:hover:bg-dark-surface-2`;
    };

    const getTagColor = (tag) => {
        const colorMap = {
            'personal': 'bg-lush-peach',
            'work': 'bg-lush-violet',
            'friends': 'bg-velvet-violet',
            'ideas': 'bg-elegant-violet',
            'important': 'bg-misty-peach'
        };
        return colorMap[tag] || 'bg-misty-lavender';
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
            <h3 className="mb-3 text-sm font-medium transition-colors duration-300 text-light-text dark:text-dark-text">Filters</h3>
            <div className="space-y-1">
                {filters.map(renderFilterButton)}
            </div>
        </div>
    );

    const renderTags = () => (
        tags && tags.length > 0 && (
            <div className="p-4 border-t border-light-border dark:border-dark-border">
                <h3 className="mb-3 text-sm font-medium transition-colors duration-300 text-light-text dark:text-dark-text">Tags</h3>
                <div className="space-y-1">
                    {tags.map(renderTagButton)}
                </div>
            </div>
        )
    );

    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const renderStatus = () => (
        <div className="p-4 border-t border-light-border dark:border-dark-border">
            <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                <div className="flex items-center">
                    <div className="w-2 h-2 mr-2 rounded-full bg-velvet-violet"></div>
                    Ready
                    <div className="ml-4">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
            </div>
        </div>
    );

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="flex flex-col w-64 transition-colors duration-300 border-r bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border">
            {/* mobile menu button */}
            <div className="flex items-center md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-moon-deep-purple focus:outline-none" aria-label="Toggle menu">
                    <i className={`ri-menu-line ${isMenuOpen ? 'ri-menu-line' : 'ri-menu-line'} text-xl`}></i>
                </button>
            </div>

            {/* Filters */}
            <div className="flex-1 overflow-y-auto">
                {renderFilters()}
                {renderTags()}
            </div>
            {/* Status */}
            {renderStatus()}

            {/* mobile menu */}
            {isMenuOpen && (
                <div className="px-4 pb-4 space-y-2 transition-all duration-300 ease-in-out rounded-none md:hidden">
                    {/* Filters */}
                    <div className="flex-1 overflow-y-auto">
                        {renderFilters()}
                        {renderTags()}
                    </div>
                    {/* Status */}
                    {renderStatus()}
                </div>
            )}
        </div>
    );
}

export default Sidebar;