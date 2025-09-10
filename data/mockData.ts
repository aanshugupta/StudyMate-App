
import type { Subject, PYQSubject } from '../types';

export const mockSubjects: Subject[] = [
    {
        id: 'cs',
        name: 'Computer Science',
        semesters: [
            {
                id: 1,
                name: 'Semester 1',
                topics: [
                    { id: 'cs-s1-t1', title: 'Introduction to Programming', content: `
# Introduction to Programming
**Programming** is the process of creating a set of instructions that tell a computer how to perform a task.
- **Languages**: Python, Java, C++
- **Core Concepts**:
    1.  Variables & Data Types
    2.  Control Structures (if/else, loops)
    3.  Functions
    4.  Data Structures (Arrays, Lists)` },
                    { id: 'cs-s1-t2', title: 'Digital Logic Design', content: `
# Digital Logic Design
This subject introduces the fundamental concepts of digital computer organization and design.
- **Key Topics**:
    - Boolean Algebra
    - Logic Gates (AND, OR, NOT, XOR)
    - Combinational and Sequential Circuits
    - Flip-flops and Registers` },
                ],
            },
            {
                id: 2,
                name: 'Semester 2',
                topics: [
                    { id: 'cs-s2-t1', title: 'Data Structures & Algorithms', content: `
# Data Structures & Algorithms
Focuses on organizing data and the algorithms to process them efficiently.
- **Data Structures**:
    - Stacks & Queues
    - Linked Lists
    - Trees (Binary, AVL)
    - Graphs
- **Algorithms**:
    - Sorting (Bubble, Merge, Quick)
    - Searching (Linear, Binary)
    - Graph Traversal (DFS, BFS)` },
                ],
            },
        ],
    },
    {
        id: 'phy',
        name: 'Physics',
        semesters: [
            {
                id: 1,
                name: 'Semester 1',
                topics: [
                    { id: 'phy-s1-t1', title: 'Classical Mechanics', content: `
# Classical Mechanics
Deals with the motion of macroscopic objects.
- **Newton's Laws of Motion**:
    1.  **First Law (Inertia)**: An object at rest stays at rest and an object in motion stays in motion unless acted upon by a net external force.
    2.  **Second Law**: F = ma
    3.  **Third Law**: For every action, there is an equal and opposite reaction.
- **Concepts**:
    - Work and Energy
    - Momentum and Collisions
    - Rotational Motion` },
                ],
            },
        ],
    },
];


export const mockPYQs: PYQSubject[] = [
    {
        id: 'cs-pyq',
        name: 'Computer Science',
        years: [
            {
                year: 2023,
                questions: [
                    { id: 'cs-23-q1', question: 'Explain the difference between a stack and a queue.', answer: `
### Stack vs. Queue

**Stack**:
- A **LIFO** (Last-In, First-Out) data structure.
- The last element added is the first one to be removed.
- **Operations**: \`push\` (add element), \`pop\` (remove element).
- **Analogy**: A stack of plates.

**Queue**:
- A **FIFO** (First-In, First-Out) data structure.
- The first element added is the first one to be removed.
- **Operations**: \`enqueue\` (add element), \`dequeue\` (remove element).
- **Analogy**: A queue of people waiting in line.` },
                    { id: 'cs-23-q2', question: 'What is polymorphism in Object-Oriented Programming?', answer: `
### Polymorphism in OOP

Polymorphism, from Greek, means "many forms." In OOP, it is the ability of an object to take on many forms.
- The most common use of polymorphism is when a parent class reference is used to refer to a child class object.
- **Types**:
    1.  **Compile-time (Static) Polymorphism**: Achieved through method overloading.
    2.  **Runtime (Dynamic) Polymorphism**: Achieved through method overriding.` },
                ]
            },
            {
                year: 2022,
                questions: [
                    { id: 'cs-22-q1', question: 'Describe the OSI Model layers.', answer: `
### OSI Model (7 Layers)

1.  **Physical Layer**: Transmits raw bits over a physical medium.
2.  **Data Link Layer**: Manages node-to-node data transfer and error detection.
3.  **Network Layer**: Handles routing and logical addressing (IP addresses).
4.  **Transport Layer**: Provides reliable data transfer (TCP/UDP).
5.  **Session Layer**: Manages sessions between applications.
6.  **Presentation Layer**: Translates, encrypts, and compresses data.
7.  **Application Layer**: Provides services for user applications (HTTP, FTP).` },
                ]
            }
        ]
    }
];
