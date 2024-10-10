"use client"
// components/ActionButtons.tsx
import React from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation instead
import { FaMapMarkerAlt, FaHome, FaExclamationTriangle, FaExclamationCircle, FaSync } from 'react-icons/fa';

const ActionButtons: React.FC = () => {
    const router = useRouter(); // Initialize the router
    const buttons = [
        { icon: <FaMapMarkerAlt />, text: "Demander une deuxième délimitation", path: "/form" },
        { icon: <FaHome />, text: "Demander d'enregistrer une propriété foncière non cadastrée", path: "/form" },
        { icon: <FaExclamationTriangle />, text: "Signaler une fraude immobilière", path: "/form" },
        { icon: <FaExclamationCircle />, text: "Déclarer un conflit", path: "/form" },
        { icon: <FaSync />, text: "Demander la mise à jour des informations cadastrales", path: "/form" },
    ];

    return (
        <div className="flex flex-col space-y-6 mx-60 mt-14">
            {buttons.map((button, index) => (
                <button
                    key={index}
                    className="flex items-center justify-start p-4 border border-[#B2D9D0] bg-white hover:bg-[#B2D9D0] transition duration-200 ease-in-out"
                    onClick={() => router.push(`${button.path}?title=${encodeURIComponent(button.text)}`)} // Add onClick handler to navigate
                >
                    <span className="mr-2">{button.icon}</span>
                    {button.text}
                </button>
            ))}
        </div>
    );
};

export default ActionButtons;
