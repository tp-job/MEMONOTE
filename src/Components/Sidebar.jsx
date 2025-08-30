import { useState, useEffect } from 'react';

const Sidebar = ({ activeFilter, onFilterChange, noteCount, tags, notesWithLinks, notesWithTags, isMenuOpen, setIsMenuOpen }) => {
    // Filter configuration with icons
    const filters = [
        { id: 'all', label: 'All Notes', count: noteCount, icon: 'ri-file-list-3-line' },
        { id: 'tagged', label: 'Tagged', count: notesWithTags || 0, icon: 'ri-price-tag-3-line' },
        { id: 'untagged', label: 'Untagged', count: noteCount - (notesWithTags || 0), icon: 'ri-file-line' },
        { id: 'with-links', label: 'With Links', count: notesWithLinks || 0, icon: 'ri-links-line' }
    ];

    // Helper functions
    const getFilterButtonClass = (filterId) => {
        const baseClass = "w-full flex items-center justify-between px-2 py-1.5 rounded-md text-left transition-all duration-200 group";
        return activeFilter === filterId
            ? `${baseClass} bg-gradient-to-r from-lush-violet/10 to-velvet-violet/10 dark:from-lush-violet/20 dark:to-velvet-violet/20 text-lush-violet dark:text-velvet-violet shadow-sm border border-lush-violet/20 dark:border-lush-violet/30`
            : `${baseClass} text-light-text dark:text-dark-text hover:bg-light-surface-2 dark:hover:bg-dark-surface-2 hover:shadow-sm`;
    };

    const getCountBadgeClass = (filterId) => {
        const baseClass = "text-xs px-2 py-0.5 rounded-full font-medium transition-all duration-200";
        return activeFilter === filterId
            ? `${baseClass} bg-lush-violet/20 dark:bg-lush-violet/30 text-lush-violet dark:text-velvet-violet`
            : `${baseClass} bg-light-surface-2 dark:bg-dark-surface-2 text-light-text-secondary dark:text-dark-text-secondary group-hover:bg-lush-violet/10 dark:group-hover:bg-lush-violet/20`;
    };

    const getTagButtonClass = (tag) => {
        const baseClass = "w-full flex items-center px-2 py-1.5 rounded-md text-left transition-all duration-200 group";
        return activeFilter === tag
            ? `${baseClass} bg-gradient-to-r from-elegant-violet/10 to-misty-lavender/10 dark:from-elegant-violet/20 dark:to-misty-lavender/20 text-lush-violet dark:text-velvet-violet shadow-sm border border-elegant-violet/20 dark:border-elegant-violet/30`
            : `${baseClass} text-light-text dark:text-dark-text hover:bg-light-surface-2 dark:hover:bg-dark-surface-2 hover:shadow-sm`;
    };

    const getTagColor = (tag) => {
        const colorMap = {
            'personal': 'bg-lush-peach',
            'work': 'bg-lush-violet',
            'friends': 'bg-velvet-violet',
            'ideas': 'bg-elegant-violet',
            'important': 'bg-misty-peach',
            'todo': 'bg-charcoal-grey',
            'project': 'bg-deep-night'
        };
        return colorMap[tag] || 'bg-misty-lavender';
    };

    // Render helpers
    const renderFilterButton = (filter) => (
        <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={getFilterButtonClass(filter.id)}
            title={`Show ${filter.label}`}
        >
            <div className="flex items-center gap-2">
                <i className={`${filter.icon} text-base transition-transform duration-200 group-hover:scale-110`}></i>
                <span className="text-sm font-medium">{filter.label}</span>
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
            title={`Filter by ${tag} tag`}
        >
            <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${getTagColor(tag)} shadow-sm transition-transform duration-200 group-hover:scale-125`}></div>
                <span className="text-sm font-medium capitalize">{tag}</span>
            </div>
            <i className="ri-arrow-right-s-line text-base opacity-0 group-hover:opacity-100 transition-opacity duration-200"></i>
        </button>
    );

    const renderFilters = () => (
        <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lush-violet to-velvet-violet flex items-center justify-center">
                    <i className="ri-filter-3-line text-white text-sm"></i>
                </div>
                <h3 className="text-sm font-medium transition-colors duration-300 text-light-text dark:text-dark-text">Filters</h3>
            </div>
            <div className="space-y-1">
                {filters.map(renderFilterButton)}
            </div>
        </div>
    );

    const renderTags = () => {
        const [showTooltip, setShowTooltip] = useState(false);

        return (
            tags &&
            tags.length > 0 && (
                <div className="p-4 border-t border-light-border dark:border-dark-border">
                    <div className="flex items-center gap-3 mb-3 relative">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-elegant-violet to-misty-lavender flex items-center justify-center">
                            <i className="ri-price-tag-3-line text-white text-sm"></i>
                        </div>
                        <h3 className="text-sm font-medium transition-colors duration-300 text-light-text dark:text-dark-text">
                            Tags
                        </h3>

                        {/* Info icon with tooltip */}
                        <div
                            className="relative"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        >
                            <i className="ri-information-fill cursor-pointer text-light-text dark:text-dark-text"></i>

                            {showTooltip && (
                                <div className="absolute right-0 top-6 z-50 w-32 p-2 rounded-lg shadow-xl bg-white dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 max-h-48 overflow-hidden">
                                    <div className="text-xs font-semibold mb-1 text-gray-600 dark:text-gray-400">Tag Colors</div>
                                    <div className="space-y-1">
                                        {Object.entries({
                                            personal: "bg-orange-400",
                                            work: "bg-purple-500",
                                            friends: "bg-violet-500",
                                            ideas: "bg-indigo-400",
                                            important: "bg-pink-400",
                                            todo: "bg-gray-600",
                                            project: "bg-gray-800",
                                        }).map(([tag, color]) => (
                                            <div key={tag} className="flex items-center gap-1.5 text-xs">
                                                <span className={`w-2 h-2 rounded-full ${color} flex-shrink-0`}></span>
                                                <span className="truncate">{tag}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <span className="ml-auto text-xs text-light-text-secondary dark:text-dark-text-secondary bg-light-surface-2 dark:bg-dark-surface-2 px-2 py-1 rounded-full">
                            {tags.length}
                        </span>
                    </div>

                    <div className="space-y-1">
                        {tags.map(renderTagButton)}
                    </div>
                </div>
            )
        );
    };

    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const renderStatus = () => (
        <div className="p-4 border-t border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-lush-violet to-velvet-violet animate-pulse"></div>
                        <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-lush-violet to-velvet-violet animate-ping opacity-75"></div>
                    </div>
                    <span className="text-sm font-medium text-light-text dark:text-dark-text">Ready</span>
                </div>
                <div className="text-sm font-mono text-light-text-secondary dark:text-dark-text-secondary bg-light-surface-2 dark:bg-dark-surface-2 px-3 py-1 rounded-lg">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </div>
    );

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('.sidebar-container')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen, setIsMenuOpen]);

    return (
        <>
            {/* Mobile Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMenuOpen(false)}></div>
            )}

            {/* Sidebar Container */}
            <div className={`sidebar-container fixed lg:relative z-50 h-full transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`} style={{ borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem', top: 0 }}>
                <div className="flex flex-col w-72 h-full transition-all duration-300 border-r bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border shadow-sm">
                    {/* Header */}
                    <div className={`flex items-center justify-between p-4 border-b border-light-border dark:border-dark-border ${isMenuOpen ? 'lg:flex' : 'flex'}`}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lush-violet to-velvet-violet flex items-center justify-center">
                                <i className="ri-sticky-note-line text-white text-sm"></i>
                            </div>
                            <h2 className="text-lg font-bold text-light-text dark:text-dark-text">MemoNote</h2>
                        </div>
                        
                        {/* Mobile menu button */}
                        <button 
                            onClick={() => setIsMenuOpen(false)} 
                            className="p-2 rounded-lg text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-surface-2 dark:hover:bg-dark-surface-2 lg:hidden transition-all duration-200"
                            aria-label="Close menu"
                        >
                            <i className="ri-close-line text-xl"></i>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto">
                        {renderFilters()}
                        {renderTags()}
                    </div>

                    {/* Status - Fixed at bottom */}
                    {renderStatus()}
                </div>
            </div>
        </>
    );
}

export default Sidebar;