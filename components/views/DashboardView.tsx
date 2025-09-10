
import React from 'react';
import { Card } from '../Card';

// A placeholder for a chart component. In a real app, this would be from a library like Recharts.
const PlaceholderChart: React.FC = () => (
    <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500 font-medium">Chart Placeholder</p>
    </div>
);

export const DashboardView: React.FC = () => {
    const stats = [
        { title: 'Subjects Covered', value: '2 / 5', color: 'blue' },
        { title: 'Notes Studied', value: '4 / 20', color: 'green' },
        { title: 'PYQs Solved', value: '8 / 50', color: 'indigo' },
        { title: 'AI Queries', value: '12', color: 'purple' },
    ];

    const colorClasses: { [key: string]: string } = {
        blue: 'from-blue-400 to-blue-600',
        green: 'from-green-400 to-green-600',
        indigo: 'from-indigo-400 to-indigo-600',
        purple: 'from-purple-400 to-purple-600',
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(stat => (
                    <div key={stat.title} className={`bg-gradient-to-br ${colorClasses[stat.color]} text-white p-6 rounded-xl shadow-lg`}>
                        <h4 className="text-lg font-semibold">{stat.title}</h4>
                        <p className="text-4xl font-bold mt-2">{stat.value}</p>
                    </div>
                ))}
            </div>

            <Card title="Study Progress Overview">
                <PlaceholderChart />
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card title="Recent Activity">
                    <ul className="space-y-3">
                        <li className="flex items-center"><span className="bg-green-200 text-green-800 text-xs font-semibold mr-3 px-2.5 py-0.5 rounded-full">NOTE</span> Studied "Classical Mechanics"</li>
                        <li className="flex items-center"><span className="bg-indigo-200 text-indigo-800 text-xs font-semibold mr-3 px-2.5 py-0.5 rounded-full">PYQ</span> Solved "Stack vs Queue (2023)"</li>
                        <li className="flex items-center"><span className="bg-purple-200 text-purple-800 text-xs font-semibold mr-3 px-2.5 py-0.5 rounded-full">AI</span> Asked "What is polymorphism?"</li>
                    </ul>
                </Card>
                <Card title="Revision Tracker">
                    <p className="text-gray-600 mb-4">Topics you might want to revise:</p>
                     <ul className="space-y-3">
                        <li className="flex justify-between items-center p-2 rounded-md bg-yellow-100"><span>Data Structures</span> <button className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">Revise</button></li>
                        <li className="flex justify-between items-center p-2 rounded-md bg-yellow-100"><span>Digital Logic</span> <button className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">Revise</button></li>
                    </ul>
                </Card>
            </div>
        </div>
    );
};
