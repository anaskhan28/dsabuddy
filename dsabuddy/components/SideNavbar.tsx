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

const SideNavbar = () => {
    const [user, setUser] = useState<User>();
    const [isMounted, setIsMounted] = useState(false);
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
    console.log(user?.user_metadata?.avatar_url, 'userdata');

    return (
        <div className="flex flex-col w-64 h-screen bg-[#07070b] text-white shadow-lg">
            <Link href="/">
                <div className="flex items-center gap-2 p-4">
                    <Image src="/logo.png" alt="DSABuddy" width={150} height={150} />
                </div>
            </Link>
            <nav className="flex flex-col space-y-2">
                <Link className="flex items-center text-white hover:text-blue-400 py-2 px-4" href="/">
                    <IoHomeSharp className="mr-2" /> Home
                </Link>
                <Link className="flex items-center text-white hover:text-blue-400 py-2 px-4" href="/track">
                    <CgTrack className="mr-2" /> Track
                </Link>
                <Link className="flex items-center text-white hover:text-blue-400 py-2 px-4" href="/sheets">
                    <SiGooglesheets className="mr-2" /> Sheets
                </Link>
                <Link className="flex items-center text-white hover:text-blue-400 py-2 px-4" href="/roadmap">
                    <RiMapFill className="mr-2" /> Roadmap
                </Link>
            </nav>
            <div className="flex flex-col mt-auto mb-4 p-4">
                {!user && (
                    <>
                        <Link className="text-white hover:text-blue-400 py-2" href="/login">
                            Login
                        </Link>
                        <Link href="/signup">
                            <button className="mt-2 group/button relative inline-flex h-7 w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] font-medium text-white transition-all duration-300 hover:w-28">
                                <p className="inline-flex whitespace-nowrap text-xs opacity-0 transition-all duration-200 group-hover/button:-translate-x-2.5 group-hover/button:opacity-100">
                                    Get Started
                                </p>
                                <div className="absolute right-1.5">
                                    <svg viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-white">
                                        <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"></path>
                                    </svg>
                                </div>
                            </button>
                        </Link>
                    </>
                )}

                {user && (
                    <>
                        <button className="text-white hover:text-blue-400 py-2" onClick={handleSignout}>
                            Logout
                        </button>
                        <div className="flex items-center mt-4">
                            <Avatar>
                                <AvatarImage src={user.user_metadata.avatar_url} alt="profile" />
                                <AvatarFallback>User Profile</AvatarFallback>
                            </Avatar>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SideNavbar;
