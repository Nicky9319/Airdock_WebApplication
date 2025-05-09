import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-[100] bg-[#000]/92 backdrop-blur-lg flex justify-between items-center p-3 lg:px-6 w-full">
            <a href="/" className="flex items-center gap-3 font-bold text-xl text-[#F9FAFB]">
                <img
                    src="https://img.icons8.com/fluency/96/000000/artificial-intelligence.png"
                    alt="AI Marketplace"
                    className="w-8 h-8 rounded-md"
                />
                <span>AirDock</span>
            </a>
        </nav>
    );
};

export default Navbar;
