
import React, { useState } from 'react';
import { Card } from '../Card';
import MarkdownRenderer from '../MarkdownRenderer';
import { mockSubjects } from '../../data/mockData';
import type { Subject, Semester, NoteTopic } from '../../types';

export const NotesView: React.FC = () => {
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(mockSubjects[0]);
    const [selectedSemester, setSelectedSemester] = useState<Semester | null>(mockSubjects[0].semesters[0]);
    const [selectedTopic, setSelectedTopic] = useState<NoteTopic | null>(mockSubjects[0].semesters[0].topics[0]);

    const handleSubjectChange = (subjectId: string) => {
        const subject = mockSubjects.find(s => s.id === subjectId) || null;
        setSelectedSubject(subject);
        const firstSemester = subject?.semesters[0] || null;
        setSelectedSemester(firstSemester);
        setSelectedTopic(firstSemester?.topics[0] || null);
    };

    const handleSemesterChange = (semesterId: number) => {
        const semester = selectedSubject?.semesters.find(s => s.id === semesterId) || null;
        setSelectedSemester(semester);
        setSelectedTopic(semester?.topics[0] || null);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-6">
                <Card title="Select Subject">
                    <select
                        value={selectedSubject?.id || ''}
                        onChange={(e) => handleSubjectChange(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        {mockSubjects.map(subject => (
                            <option key={subject.id} value={subject.id}>{subject.name}</option>
                        ))}
                    </select>
                </Card>

                {selectedSubject && (
                    <Card title="Select Semester & Topic">
                        <div className="space-y-4">
                            <select
                                value={selectedSemester?.id || ''}
                                onChange={(e) => handleSemesterChange(Number(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                {selectedSubject.semesters.map(semester => (
                                    <option key={semester.id} value={semester.id}>{semester.name}</option>
                                ))}
                            </select>

                            {selectedSemester && (
                                <ul className="space-y-2">
                                    {selectedSemester.topics.map(topic => (
                                        <li
                                            key={topic.id}
                                            onClick={() => setSelectedTopic(topic)}
                                            className={`p-3 rounded-lg cursor-pointer transition-all ${selectedTopic?.id === topic.id ? 'bg-primary text-white font-semibold' : 'hover:bg-gray-100'}`}
                                        >
                                            {topic.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </Card>
                )}
            </div>

            <div className="lg:col-span-2">
                <Card>
                    {selectedTopic ? (
                        <MarkdownRenderer content={selectedTopic.content} />
                    ) : (
                        <p className="text-center text-gray-500">Please select a topic to view the notes.</p>
                    )}
                </Card>
            </div>
        </div>
    );
};
