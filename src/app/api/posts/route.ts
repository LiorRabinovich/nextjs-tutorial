import { NextRequest, NextResponse } from "next/server";
import { firestore } from '@/firebase'
import Post from '@/types/Post';
import { isPostValid } from '@/services/posts';

// GET /api/posts
export async function GET() {
    const snapshot: FirebaseFirestore.QuerySnapshot = await firestore.collection('posts').get();
    const posts: Post[] = snapshot.docs.map((doc) => {
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

    if (!(isPostValid(post))) {
        return new NextResponse('Bad request', { status: 400 });
    }

    try {
        await firestore.collection('posts').doc().set({
            ...post
        })
        console.log('Post added successfully');
        return NextResponse.json({ message: 'Post added successfully' })
    } catch (error) {
        console.error('Error adding post: ', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}