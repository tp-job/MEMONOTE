export default function SearchBar({ search, setSearch }) {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes..."
                className="block w-full pl-9 pr-3 py-2 border border-light-border dark:border-dark-border rounded-lg leading-5 bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text placeholder-light-text-secondary dark:placeholder-dark-text-secondary focus:outline-none focus:placeholder-light-text-secondary dark:focus:placeholder-dark-text-secondary focus:ring-2 focus:ring-lush-violet focus:border-lush-violet transition-colors duration-200 text-sm"
            />
        </div>
    );
}
