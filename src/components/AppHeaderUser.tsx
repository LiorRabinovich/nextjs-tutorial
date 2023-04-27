'use client'

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function AppHeaderUser() {
    const { data: session } = useSession();

    function handleSignOut() {
        signOut();
    }

    return (
        <div className="ml-auto flex gap-4">
            {
                session ? (
                    <>
                        <span className="text-white">{session?.user?.name}</span>
                        <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-600 text-white font-medium text-sm py-1 px-2 rounded ml-auto">Sign Out</button>
                    </>
                ) : (
                    <Link className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-q px-2 rounded ml-auto text-sm" href="/signin">Sign In</Link>
                )
            }

        </div>
    )
}