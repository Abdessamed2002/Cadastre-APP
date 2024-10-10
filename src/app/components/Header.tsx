// components/Header.tsx
import React from 'react';
import Link from 'next/link';
import { FaLandmark } from 'react-icons/fa'; // Import the icon

const Header: React.FC = () => {
    return (
        <>
            <header className="flex justify-between items-center px-8 py-6">
                {/* Left Section: Icon and Text */}
                <div className="flex items-center space-x-4">
                    <FaLandmark className="text-3xl" /> {/* Icon for cadastre */}
                    <h1 className="text-3xl font-bold">Cadastre</h1>
                </div>
                {/* Right Section: Phone Number */}
                <div className="flex items-center">
                    <p className="text-xl">+213 777 777 777</p> {/* Phone number */}
                </div>
            </header>
            {/* Bottom Line */}
            <div className="border-b-4 border-[#B2D9D0] mx-7"/>
        </>
    );
};

export default Header;
