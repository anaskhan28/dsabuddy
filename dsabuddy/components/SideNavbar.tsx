'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useSupabaseClient from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar';
import { IoHomeSharp } from "react-icons/io5";
import { CgTrack } from "react-icons/cg";
import { SiGooglesheets } from "react-icons/si";
import { RiMapFill } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";

const SideNavbar = () => {
    const [user, setUser] = useState<User>();
    const [isMounted, setIsMounted] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const supabase = useSupabaseClient();

    const handleSignout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) setUser(undefined);
    };

    useEffect(() => {
        const getCurrentUser = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (session) {
                setUser(session.user);
            }
        };
        getCurrentUser();
        setIsMounted(true);
    }, [supabase.auth]);

    if (!isMounted) return null;

    return (
        <div className="relative">
            <button
                className="md:hidden text-white p-4"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <FiMenu />
            </button>
            <div className={`md:flex flex-col md:fixed top-0 left-0 w-full md:w-64 bg-black transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 min-h-screen`}>
                <div className="flex items-center justify-between p-4 border-b border-black border-opacity-20">
                    <Link href="/" className="flex items-center">
                        <Image src="/logo.png" alt="Logo" width={150} height={150} />
                    </Link>
                    <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(false)}>
                        <FiMenu />
                    </button>
                </div>
                <nav className="flex-1 px-2 py-4 space-y-1">
                    <Link href="/" className="flex items-center px-4 py-4 text-lg font-semibold text-white rounded-md hover:bg-gray-800">
                        <IoHomeSharp className="mr-3 h-6 w-6" />
                        Home
                    </Link>
                    <Link href="/track" className="flex items-center px-4 py-4 text-lg font-semibold text-white rounded-md hover:bg-gray-800">
                        <CgTrack className="mr-3 h-6 w-6" />
                        Track
                    </Link>
                    <Link href="/chat" className="flex items-center px-4 py-4 text-lg font-semibold text-white rounded-md hover:bg-gray-800">
                        <SiGooglesheets className="mr-3 h-6 w-6" />
                        Chat
                    </Link>
                    <Link href="/roadmap" className="flex items-center px-4 py-4 text-lg font-semibold text-white rounded-md hover:bg-gray-800">
                        <RiMapFill className="mr-3 h-6 w-6" />
                        Roadmap
                    </Link>
                    <Link href="/preferences" className="flex items-center px-4 py-4 text-lg font-semibold text-white rounded-md hover:bg-gray-800">
                        Preferences
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default SideNavbar;
