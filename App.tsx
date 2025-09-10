
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/views/DashboardView';
import { NotesView } from './components/views/NotesView';
import { PYQView } from './components/views/PYQView';
import { AIAssistantView } from './components/views/AIAssistantView';
import type { View } from './types';
import { VIEWS } from './constants';

const App: React.FC = () => {
    const [activeView, setActiveView] = useState<View>(VIEWS.DASHBOARD);

    const renderView = () => {
        switch (activeView) {
            case VIEWS.DASHBOARD:
                return <DashboardView />;
            case VIEWS.NOTES:
                return <NotesView />;
            case VIEWS.PYQS:
                return <PYQView />;
            case VIEWS.AI_ASSISTANT:
                return <AIAssistantView />;
            default:
                return <DashboardView />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans text-gray-800">
            <Sidebar activeView={activeView} setActiveView={setActiveView} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title={activeView} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8 scroll-smooth">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default App;
