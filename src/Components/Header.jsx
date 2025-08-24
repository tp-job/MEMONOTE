export default function Header({ onAdd }) {
    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between h-14 px-6">
                <div className="flex items-center">
                    <h1 className="text-xl font-bold text-gray-900 flex items-center">
                        MemoNote
                    </h1>
                </div>

                <div className="flex items-center space-x-4">

                    <button
                        onClick={onAdd}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Note
                    </button>
                </div>
            </div>
        </header>
    );
}
