
import { VIEWS } from './constants';

export type View = typeof VIEWS[keyof typeof VIEWS];

export interface NoteTopic {
    id: string;
    title: string;
    content: string; // Markdown content
}

export interface Semester {
    id: number;
    name: string;
    topics: NoteTopic[];
}

export interface Subject {
    id: string;
    name: string;
    semesters: Semester[];
}

export interface PYQ {
    id: string;
    question: string;
    answer: string; // Markdown content
}

export interface PYQYear {
    year: number;
    questions: PYQ[];
}

export interface PYQSubject {
    id: string;
    name: string;
    years: PYQYear[];
}


export interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
    id: string;
}
