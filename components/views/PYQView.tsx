
import React, { useState } from 'react';
import { Card } from '../Card';
import MarkdownRenderer from '../MarkdownRenderer';
import { mockPYQs } from '../../data/mockData';
import type { PYQSubject, PYQYear } from '../../types';

const AccordionItem: React.FC<{ question: string, answer: string, isOpen: boolean, onClick: () => void }> = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
                <span>{question}</span>
                <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
            >
                <div className="p-4 bg-gray-50">
                    <MarkdownRenderer content={answer} />
                </div>
            </div>
        </div>
    );
};

export const PYQView: React.FC = () => {
    const [selectedSubject, setSelectedSubject] = useState<PYQSubject | null>(mockPYQs[0]);
    const [selectedYear, setSelectedYear] = useState<PYQYear | null>(mockPYQs[0].years[0]);
    const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);

    const handleSubjectChange = (subjectId: string) => {
        const subject = mockPYQs.find(s => s.id === subjectId) || null;
        setSelectedSubject(subject);
        setSelectedYear(subject?.years[0] || null);
        setOpenQuestionId(null);
    };

    const handleYearChange = (year: number) => {
        const yearData = selectedSubject?.years.find(y => y.year === year) || null;
        setSelectedYear(yearData);
        setOpenQuestionId(null);
    };

    const toggleQuestion = (questionId: string) => {
        setOpenQuestionId(openQuestionId === questionId ? null : questionId);
    };

    return (
        <div className="space-y-8">
            <Card title="Select Subject & Year">
                <div className="flex flex-col sm:flex-row gap-4">
                    <select
                        value={selectedSubject?.id || ''}
                        onChange={(e) => handleSubjectChange(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
                    >
                        {mockPYQs.map(subject => (
                            <option key={subject.id} value={subject.id}>{subject.name}</option>
                        ))}
                    </select>
                    {selectedSubject && (
                        <select
                            value={selectedYear?.year || ''}
                            onChange={(e) => handleYearChange(Number(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
                        >
                            {selectedSubject.years.map(year => (
                                <option key={year.year} value={year.year}>{year.year}</option>
                            ))}
                        </select>
                    )}
                </div>
            </Card>

            <Card>
                {selectedYear ? (
                    <div className="border border-gray-200 rounded-lg">
                        {selectedYear.questions.map((q, index) => (
                           <AccordionItem 
                                key={q.id}
                                question={`${index + 1}. ${q.question}`}
                                answer={q.answer}
                                isOpen={openQuestionId === q.id}
                                onClick={() => toggleQuestion(q.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Please select a year to view questions.</p>
                )}
            </Card>
        </div>
    );
};
