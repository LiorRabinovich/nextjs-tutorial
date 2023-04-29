import { NextRequest } from "next/server";

export default function revalidate(request: NextRequest, paths: string[]) {
    const origin = request.headers.get('origin');
    
    return fetch(`${origin}/api/revalidate`, {
        cache: 'no-cache',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': request.cookies.toString()
        },
        body: JSON.stringify({
            secret: process.env.REVALIDATE_SECRET,
            paths,
        })
    })
}