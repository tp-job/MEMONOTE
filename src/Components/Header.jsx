import { useTheme } from '../Context/ThemeContext';
import { useState } from 'react';

const Header = ({ onAdd, setIsMenuOpen }) => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <header className="transition-all duration-300 border-b shadow-sm bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border">
            <div className="flex items-center justify-between px-4 lg:px-6 h-14">
                <div className="flex items-center">
                    <h1 className="text-lg lg:text-xl font-bold tracking-[2px] lg:tracking-[6px] text-light-text dark:text-dark-text">
                        MEMONOTE
                    </h1>
                </div>

                <div className="flex items-center space-x-2 lg:space-x-4">
                    {/* Social Media Buttons - Hidden on mobile */}
                    <div className="hidden md:flex space-x-2">
                        {/* Twitter Share Button */}
                        <button className="p-2 transition-all duration-300 rounded-lg bg-light-surface-2 dark:bg-dark-surface-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:shadow-md">
                            <i className="ri-twitter-x-line"></i>
                        </button>
                        {/* Instagram Share Button */}
                        <button className="p-2 transition-all duration-300 rounded-lg bg-light-surface-2 dark:bg-dark-surface-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:shadow-md">
                            <i className="ri-instagram-line"></i>
                        </button>
                        {/* Facebook Share Button */}
                        <button className="p-2 transition-all duration-300 rounded-lg bg-light-surface-2 dark:bg-dark-surface-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:shadow-md">
                            <i className="ri-facebook-line"></i>
                        </button>
                        {/* github Share Button */}
                        <button className="p-2 transition-all duration-300 rounded-lg bg-light-surface-2 dark:bg-dark-surface-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:shadow-md">
                            <i className="ri-github-line"></i>
                        </button>
                    </div>

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 transition-all duration-300 rounded-lg bg-light-surface-2 dark:bg-dark-surface-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:shadow-md"
                        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                    >
                        {isDark ? (
                            <i className="ri-sun-line"></i>
                        ) : (
                            <i className="ri-moon-cloudy-line"></i>
                        )}
                    </button>

                    {/* Add Note Button */}
                    <button
                        onClick={onAdd}
                        className="inline-flex items-center px-3 lg:px-4 py-2 text-sm font-medium text-white transition-all duration-200 border border-transparent rounded-lg bg-lush-violet hover:bg-velvet-violet focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lush-violet hover:shadow-md active:scale-95"
                    >
                        <i className="ri-add-large-fill mr-1 lg:mr-2"></i>
                        <span className="hidden sm:inline">New Note</span>
                        <span className="sm:hidden">Add</span>
                    </button>

                    {/* Mobile Menu Toggle Button */}
                    <button 
                        onClick={() => setIsMenuOpen(prev => !prev)} 
                        className="p-2 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border shadow-md text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-surface-2 dark:hover:bg-dark-surface-2 transition-all duration-200 lg:hidden"
                        aria-label="Open menu"
                    >
                        <i className="ri-menu-line text-xl"></i>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;