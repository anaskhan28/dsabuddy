'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegCopy } from 'react-icons/fa';
import SideNavbar from '@/components/SideNavbar';
import { SiLeetcode, SiCodeforces, SiHackerrank } from "react-icons/si";

const Track: React.FC = () => {
  const [problems, setProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

        const userSolvedProblems = [
          {
            "problem_id": "p11",
            "name": "Two Sum",
            "difficulty": "easy",
            "tags": ["array", "hash table"],
            "time_taken": "10 minutes",
            "attempts": 1,
            "hints_used": 0,
            "submission_status": "accepted",
            "submission_count": 1
          },
          {
            "problem_id": "p2",
            "name": "Add Two Numbers",
            "difficulty": "medium",
            "tags": ["linked list", "math"],
            "time_taken": "20 minutes",
            "attempts": 2,
            "hints_used": 1,
            "submission_status": "accepted",
            "submission_count": 2
          }
        ];

        const combinedProblems = [
          ...userSolvedProblems,
          leetcodeData,
          codeforcesData,
          hackerrankData
        ];

        setProblems(combinedProblems);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data: ' + error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClickCopy = (problemName: string) => {
    navigator.clipboard.writeText(problemName);
    alert('Problem title copied to clipboard!');
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

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white text-white">
      <SideNavbar />
      <div className="flex-1 container mx-auto px-4 py-8 md:ml-64">
        <h1 className="text-3xl font-bold mb-4">Welcome, John Doe</h1>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <div className="overflow-x-auto">
          <div className="shadow-lg overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full bg-white divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider">Topics</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider">Site</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {problems.map((problem, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-black md:text-base">{problem.title || problem.name}</td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm md:text-base">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs md:text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                          {problem?.difficulty}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm md:text-base">
                        <div className="flex flex-wrap gap-1">
                          {problem?.tags && problem?.tags?.map((tag: string, idx: number) => (
                            <span key={idx} className="inline-block bg-blue-100 text-blue-800 text-xs md:text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm md:text-base">
                        {problem.site === 'LeetCode' && <SiLeetcode />}
                        {problem.site === 'Codeforces' && <SiCodeforces />}
                        {problem.site === 'Hackerrank' && <SiHackerrank />}
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm md:text-base">
                        <button
                          onClick={() => handleClickCopy(problem.title || problem.name)}
                          className="text-blue-400 hover:text-blue-200"
                        >
                          <FaRegCopy />
                        </button>
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
