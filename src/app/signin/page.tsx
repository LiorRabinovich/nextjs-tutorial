// domain.co.il/login
'use client'
import { signIn } from 'next-auth/react';

export default function SignInPage() {

    function handleSignIn() {
        signIn('google');
    }

    return (
        <>
            <h1>Sign In</h1>
            <button onClick={handleSignIn} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Sign In With Google</button>
        </>
    )
}