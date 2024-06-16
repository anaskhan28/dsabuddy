'use client'


import React from 'react';
import SideNavbar from '@/components/SideNavbar';
import Link from 'next/link';

const Roadmap: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
            <SideNavbar />
            <div className="flex-1 container mx-auto px-4 py-8 md:ml-64">
                <h1 className="text-4xl font-bold mb-6 text-white glow">Data Structures and Algorithms Roadmap</h1>
                <p className="mb-8 text-lg text-gray-400">Master DSA and become a coding ninja with this comprehensive roadmap.</p>
                <Link href="https://roadmap.sh/datastructures-and-algorithms" passHref>
                    <p className="inline-block px-6 py-3 mb-8 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                        View Detailed Roadmap on Roadmaps.sh
                    </p>
                </Link>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                        <p className="text-gray-300">Start with understanding the basics of data structures and algorithms. Learn about time complexity and space complexity.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Arrays</h2>
                        <p className="text-gray-300">Learn about arrays, their usage, and common operations such as searching, sorting, and manipulating arrays.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Linked Lists</h2>
                        <p className="text-gray-300">Understand different types of linked lists (singly, doubly, circular) and their applications.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Stacks and Queues</h2>
                        <p className="text-gray-300">Learn about stacks and queues, their operations, and their use cases in solving problems.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. Trees and Graphs</h2>
                        <p className="text-gray-300">Study various tree structures (binary trees, AVL trees, etc.) and graph algorithms (BFS, DFS, Dijkstras, etc.).</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">6. Hashing</h2>
                        <p className="text-gray-300">Understand hashing concepts, hash tables, and their applications.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">7. Sorting and Searching Algorithms</h2>
                        <p className="text-gray-300">Explore different sorting algorithms (quick sort, merge sort, etc.) and searching techniques (binary search, etc.).</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">8. Dynamic Programming</h2>
                        <p className="text-gray-300">Learn about dynamic programming concepts, memoization, and common DP problems.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">9. Advanced Topics</h2>
                        <p className="text-gray-300">Dive into advanced topics like segment trees, trie, advanced graph algorithms, and more.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Roadmap;
