const SearchBar = ({ search, setSearch }) => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i class="ri-search-line"></i>
            </div>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes..."
                className="block w-full py-2 pr-3 text-sm leading-5 transition-colors duration-200 border rounded-lg pl-9 border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text placeholder-light-text-secondary dark:placeholder-dark-text-secondary focus:outline-none focus:placeholder-light-text-secondary dark:focus:placeholder-dark-text-secondary focus:ring-2 focus:ring-lush-violet focus:border-lush-violet"
            />
        </div>
    );
}

export default SearchBar;