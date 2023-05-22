import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

interface SignInLayoutProps {
    children: React.ReactNode
}

export const metadata = {
    title: 'Sign In | Next.js Tutorial',
    description: 'Sign In Description | Next.js Tutorial'
}

export default async function SignInLayout({ children }: SignInLayoutProps) {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect('/')
    }

    return (
        <>
            {children}
        </>
    )
}