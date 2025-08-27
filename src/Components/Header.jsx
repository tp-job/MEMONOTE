import { useTheme } from '../Context/ThemeContext';

const Header = ({ onAdd }) => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <header className="transition-all duration-300 border-b shadow-sm bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border">
            <div className="flex items-center justify-between px-6 h-14">
                <div className="flex items-center">
                    <h1 className="hidden md:block md:text-xl md:font-bold md:tracking-[6px] dark:text-dark-text">
                        MEMONOTE
                    </h1>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                        {/* Twitter Share Button */}
                        <div className="p-2 transition-all duration-300 rounded-lg bg-light-surface-2 dark:bg-dark-surface-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:shadow-md">
                            <i class="ri-twitter-x-line"></i>
                        </div>
                        {/* Instagram Share Button */}
                        <div className="p-2 transition-all duration-300 rounded-lg bg-light-surface-2 dark:bg-dark-surface-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:shadow-md">
                            <i class="ri-instagram-line"></i>
                        </div>
                        {/* Facebook Share Button */}
                        <div className="p-2 transition-all duration-300 rounded-lg bg-light-surface-2 dark:bg-dark-surface-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:shadow-md">
                            <i class="ri-facebook-line"></i>
                        </div>
                        {/* github Share Button */}
                        <div className="p-2 transition-all duration-300 rounded-lg bg-light-surface-2 dark:bg-dark-surface-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:shadow-md">
                            <i class="ri-github-line"></i>
                        </div>
                    </div>

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 transition-all duration-300 rounded-lg bg-light-surface-2 dark:bg-dark-surface-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:shadow-md"
                        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                    >
                        {isDark ? (
                            // ไอคอนดวงอาทิตย์ (เมื่ออยู่ใน dark mode)
                            <i class="ri-sun-line"></i>
                        ) : (
                            // ไอคอนพระจันทร์ (เมื่ออยู่ใน light mode)
                            <i class="ri-moon-cloudy-line"></i>
                        )}
                    </button>

                    <button
                        onClick={onAdd}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-colors duration-200 border border-transparent rounded-lg bg-lush-violet hover:bg-velvet-violet focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lush-violet"
                    >
                        <i class="ri-add-large-fill mr-1"></i>
                        New Note
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;