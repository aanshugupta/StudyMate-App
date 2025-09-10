
import React from 'react';
import type { View } from '../types';
import { VIEWS, ICONS } from '../constants';

interface SidebarProps {
    activeView: View;
    setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
    view: View;
    icon: JSX.Element;
    activeView: View;
    onClick: (view: View) => void;
}> = ({ view, icon, activeView, onClick }) => {
    const isActive = activeView === view;
    return (
        <li
            onClick={() => onClick(view)}
            className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-200 ${
                isActive
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
            }`}
        >
            {icon}
            <span className="ml-4 font-semibold">{view}</span>
        </li>
    );
};


export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
    return (
        <aside className="w-64 bg-white shadow-lg flex-shrink-0 p-4">
            <div className="flex items-center pb-4 border-b border-gray-200">
                <div className="bg-primary p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                    </svg>
                </div>
                <h1 className="text-2xl font-bold ml-3 text-primary">StudyMate</h1>
            </div>
            <nav className="mt-6">
                <ul>
                    <NavItem view={VIEWS.DASHBOARD} icon={ICONS.DASHBOARD} activeView={activeView} onClick={setActiveView} />
                    <NavItem view={VIEWS.NOTES} icon={ICONS.NOTES} activeView={activeView} onClick={setActiveView} />
                    <NavItem view={VIEWS.PYQS} icon={ICONS.PYQS} activeView={activeView} onClick={setActiveView} />
                    <NavItem view={VIEWS.AI_ASSISTANT} icon={ICONS.AI_ASSISTANT} activeView={activeView} onClick={setActiveView} />
                </ul>
            </nav>
        </aside>
    );
};
