
import React from 'react';
import type { View } from '../types';

interface HeaderProps {
    title: View;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <header className="bg-white shadow-sm p-4 z-10">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h1>
        </header>
    );
};
