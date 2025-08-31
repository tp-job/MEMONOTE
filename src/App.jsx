import { ThemeProvider } from './Context/ThemeContext';
import NotesPage from "./Pages/NotesPage";

function App() {
    return (
        <ThemeProvider>
            <div className="min-h-screen bg-light-surface dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
                <NotesPage />
            </div>
        </ThemeProvider>
    );
}

export default App;