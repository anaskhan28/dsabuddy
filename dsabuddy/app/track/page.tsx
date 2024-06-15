"use client"; 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegCopy } from 'react-icons/fa';
import SideNavbar from '@/components/SideNavbar';
import { SiLeetcode } from "react-icons/si";
import { SiHackerrank } from "react-icons/si";

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
                setError('Error fetching data: ');
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
      <div className="flex min-h-screen bg-black text-white">
        <div className="w-64 bg-black text-white px-4 py-8">
          <SideNavbar />
        </div>
        <div className="flex-1 container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Welcome, John Doe</h1>
  
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
  
          <div className="overflow-x-auto">
            <div className="shadow-lg overflow-hidden border-b border-white border-opacity-20">
              <table className="w-full bg-black">
                <thead className="bg-black">
                  <tr>
                    <th className="px-5 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-5 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                    <th className="px-5 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Topics</th>
                    <th className="px-5 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Site</th>
                    <th className="px-5 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-black divide-y divide-white divide-opacity-10">
                  {problems.map((problem, index) => (
                    <tr key={index} className="hover:bg-gray-900">
                      <td className="px-5 py-4 whitespace-nowrap text-sm">{problem.title || problem.name}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                          {problem?.difficulty}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm">
                        <div>
                          {problem?.description && (
                            <span className="block mb-1">{problem.description}</span>
                          )}
                          {problem?.tags && problem?.tags?.map((tag: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, idx: React.Key | null | undefined) => (
                            <span key={idx} className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm"><span>
                      <SiLeetcode/></span></td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm">
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
    );
  };

export default Track;
