import { NextRequest, NextResponse } from "next/server";
import { firestore } from '@/firebase'
import Post from '@/types/Post';

// GET /api/posts
export async function GET() {
    const snapshot: FirebaseFirestore.QuerySnapshot = await firestore.collection('posts').get();
    const posts = snapshot.docs.map((doc) => {
        const { title, body } = doc.data();
        return {
            id: doc.id,
            title,
            body
        }
    })
    return NextResponse.json({ posts })
}

// POST /api/posts
export async function POST(request: NextRequest) {
    const post: Post = await request.json();
    return NextResponse.json({ post })
}