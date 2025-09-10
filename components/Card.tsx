
import React from 'react';

interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
    return (
        <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${className}`}>
            {title && (
                <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                </div>
            )}
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};
