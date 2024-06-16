'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegCopy } from 'react-icons/fa';
import SideNavbar from '@/components/SideNavbar';
import { SiLeetcode, SiCodeforces, SiHackerrank } from "react-icons/si";
import mockData from '@/app/data/mockData'; // Import the mock data
import { useRouter } from 'next/router';
import Link from 'next/link';

import { redirect } from 'next/navigation';
import User from './User';
const Track: React.FC = () => {
  const [problems, setProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>(''); // State for sorting
  const [shuffleToggle, setShuffleToggle] = useState<boolean>(false); // State for shuffle
  const [difficultyFilter, setDifficultyFilter] = useState<string>(''); // State for difficulty filter
  const [tagFilter, setTagFilter] = useState<string>(''); // State for tag filter
  const [copied, setCopied] = useState(false);

  // const router = useRouter()




  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-green-500 text-green-900';
      case 'medium':
        return 'bg-yellow-500 text-yellow-900';
      case 'hard':
        return 'bg-red-500 text-red-900';
      default:
        return 'bg-gray-500 text-gray-900';
    }
  };

  useEffect(() => {


    const fetchData = async () => {
      try {
        setLoading(true);
        const leetcodeLink = 'https://leetcode.com/problems/two-sum/';
        const codeforcesLink = 'https://codeforces.com/problemset/problem/4/C';
        const hackerrankLink = 'https://www.hackerrank.com/challenges/30-arrays/problem';

        const [leetcodeData, codeforcesData, hackerrankData] = await Promise.all([
          fetchLeetCodeData(leetcodeLink),
          fetchCodeforcesData(codeforcesLink),
          fetchHackerrankData(hackerrankLink)
        ]);

        const combinedProblems = [
          ...mockData, // Include the mock data
          leetcodeData,
          codeforcesData,
          hackerrankData
        ];

        // Apply difficulty filter
        let filteredProblems = combinedProblems.filter(problem => {
          if (!difficultyFilter) return true; // No filter selected, return all problems
          return problem.difficulty?.toLowerCase() === difficultyFilter.toLowerCase();
        });

        // Apply tag filter
        if (tagFilter) {
          filteredProblems = filteredProblems.filter(problem =>
            problem.tags?.includes(tagFilter)
          );
        }

        // Apply sorting if sortBy state is set
        let sortedProblems = [...filteredProblems];
        if (sortBy === 'difficulty') {
          sortedProblems.sort((a, b) => a.difficulty.localeCompare(b.difficulty));
        } else if (sortBy === 'tags') {
          sortedProblems.sort((a, b) => a.tags.join('').localeCompare(b.tags.join('')));
        }

        // Apply shuffle if shuffleToggle state is true
        if (shuffleToggle) {
          shuffleArray(sortedProblems);
        }

        setProblems(sortedProblems);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data: ' + error);
        setLoading(false);
      }
    };

    fetchData();
  }, [sortBy, shuffleToggle, difficultyFilter, tagFilter,selectedTopic]);
  const getUniqueTags = () => {
    const tagsSet = new Set();
    problems.forEach((problem: any) => {
      problem.tags && problem.tags.forEach((tag: any) => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  };

  // Function to shuffle array randomly
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleClickCopy = (problemName: string, link:string) => {
    navigator.clipboard.writeText(problemName);
    alert('Problem title copied to clipboard!');
    setTimeout(() => setCopied(false), 3000); // Reset copied state after 3 seconds

    // Open chat page after copying
    if (link) {
     <Link href={link}/> // Navigate to the chat page URL
    }
  };

  const fetchLeetCodeData = async (link: string) => {
    try {
      const response = await axios.get(`/leet?link=${encodeURIComponent(link)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching LeetCode data:', error);
      return [];
    }
  };

  const fetchCodeforcesData = async (link: string) => {
    try {
      const response = await axios.get(`/cforce?link=${encodeURIComponent(link)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Codeforces data:', error);
      return [];
    }
  };

  const fetchHackerrankData = async (link: string) => {
    try {
      const response = await axios.get(`/hackerrank?link=${encodeURIComponent(link)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Hackerrank data:', error);
      return [];
    }
  };

  // Function to handle sorting change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  // Function to handle shuffle toggle
  const handleShuffleToggle = () => {
    setShuffleToggle(!shuffleToggle);
  };

  // Function to handle difficulty filter change
  const handleDifficultyFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficultyFilter(e.target.value);
  };

  // Function to handle tag filter change
  const handleTagFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTagFilter(e.target.value);
  };
 
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#181818] text-white">
      <SideNavbar />

      <div className="flex-1 container mx-auto px-4 py-8 md:ml-64">
       
     

        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={handleShuffleToggle}
            className="px-3 py-1 rounded-md bg-gray-700 text-white hover:bg-gray-600"
          >
            Shuffle
          </button>
        </div>

        <div className="mb-4 flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <label htmlFor="difficultyFilter" className="text-sm font-medium">
              Difficulty:
            </label>
            <select
              id="difficultyFilter"
              className="px-2 py-1 rounded-md bg-gray-700 text-white"
              value={difficultyFilter}
              onChange={handleDifficultyFilterChange}
            >
              <option value="">All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
          <div>
            <label className="mr-2">Filter by Topic:</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-2 py-1 border border-gray-300 text-black rounded"
            >
              <option value="All">All</option>
              {getUniqueTags().map((tag, idx) => (
                <option key={idx} value={tag as string}>{tag as string}</option>
              ))}
            </select>
          </div>
          </div>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <div className="overflow-x-auto">
          <div className="shadow-lg overflow-hidden border-b border-black-700 sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full bg-gray-900 divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-sm md:text-base font-medium text-gray-300 uppercase tracking-wider">Title</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-sm md:text-base font-medium text-gray-300 uppercase tracking-wider">Difficulty</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-sm md:text-base font-medium text-gray-300 uppercase tracking-wider">Tags</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-sm md:text-base font-medium text-gray-300 uppercase tracking-wider">Site</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-sm md:text-base font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {problems.slice(0, 15).map((problem, index) => (
                    <tr key={index} className="hover:bg-gray-700">
                      <td 
                       className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-200 md:text-base">{problem.title || problem.name}</td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm md:text-base">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs md:text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                          {problem?.difficulty}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm md:text-base">
                        <div className="flex flex-wrap gap-1">
                          {problem?.tags && problem?.tags.slice(0, 5).map((tag: string, idx: number) => (
                            <span key={idx} className="inline-block bg-blue-100 text-blue-800 text-xs md:text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                              {tag as string}
                            </span>
                          ))}
                          {problem?.tags && problem?.tags.length > 3 && (
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs md:text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                              +{problem.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm md:text-base">
                        {problem.link === 'LeetCode' && <SiLeetcode />}
                        {problem.link === 'Codeforces' && <SiCodeforces />}
                        {problem.link === 'Hackerrank' && <SiHackerrank />}
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm md:text-base">
                        <button
                        onClick={() => handleClickCopy(problem.title || problem.name, '/chat')} 
                       className="text-blue-400 hover:text-blue-200"
                        >
                          <FaRegCopy />
                        </button>
                        {copied && <span className="ml-2 text-green-500">Copied!</span>}

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
