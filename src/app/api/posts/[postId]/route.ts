import { NextRequest, NextResponse } from "next/server";
import { firestore } from '@/firebase'
import Post from '@/types/Post';
import { isPostValid } from '@/services/posts';

// GET /api/posts/:postId
export async function GET(request: NextRequest, context: { params: { postId: string } }) {
    const document: FirebaseFirestore.DocumentSnapshot = await firestore.collection('posts').doc(context.params.postId).get();
    const data = document.data();

    if (!(document.exists && data)) {
        return new NextResponse('Bad request', { status: 400 });
    }

    return NextResponse.json({
        id: document.id,
        title: data.title,
        body: data.body,
    })
}

// PUT /api/posts/:postId
export async function PUT(request: NextRequest, context: { params: { postId: string } }) {
    try {
        const { postId } = context.params;
        const post: Post = await request.json();

        if (!(postId && isPostValid(post))) {
            return new NextResponse('Bad request', { status: 400 });
        }

        await firestore.collection('posts').doc(postId).set({
            title: post.title,
            body: post.body,
        })

        console.log('Post edited successfully')
        return NextResponse.json({ message: 'Post edited successfully' })
    } catch (error) {
        console.error('Error edting post: ', error);
        return new NextResponse('Internal Servder Error', { status: 500 });
    }
}

// DELETE /api/posts/:postId
export async function DELETE(request: NextRequest, context: { params: { postId: string } }) {
    const { postId } = context.params;

    if (!postId) {
        return new NextResponse('Bad Request', { status: 400 });
    }

    try {
        await firestore.collection('posts').doc(postId).delete();
        console.log('Post deleted successfully');
        return NextResponse.json({ message: 'Post deleted successfully' })
    } catch (error) {
        console.error('Error deleting post: ', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
