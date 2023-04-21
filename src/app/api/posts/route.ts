import { NextRequest, NextResponse } from "next/server";
import Post from '@/types/Post';

// GET /api/posts
export async function GET() {
    const posts: Post[] = Array.from({ length: 30 }).map((_, index) => {
        return {
            id: (index + 1).toString(),
            title: `Post ${index}`,
            body: `Post ${index}`,
        }
    });
    return NextResponse.json({ posts })
}

// POST /api/posts
export async function POST(request: NextRequest) {
    const post: Post = await request.json();
    return NextResponse.json({ post })
}