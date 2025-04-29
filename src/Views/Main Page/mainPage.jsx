import React from 'react';

const MainPage = () => {
    return (
        <div className="text-center p-4">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Main Page</h1>
            <h2 className="text-2xl mb-6">Click to Open Desktop App</h2>
            <a href="myapp://open">
                <button className="px-6 py-3 bg-blue-500 text-white text-lg rounded hover:bg-blue-600 transition">
                    Open Desktop App
                </button>
            </a>
        </div>
    );
};

export default MainPage;