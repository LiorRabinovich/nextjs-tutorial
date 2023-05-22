import { NextRequest, NextResponse } from "next/server";
import admin from 'firebase-admin';
import { Session } from "next-auth";
import { firestore } from '@/firebase'
import Post from '@/types/Post';
import { findPost, getPostValidationError } from '@/services/posts.server';
import revalidate from '@/services/revalidate';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "../../auth/[...nextauth]/route";
import {
    NOT_FOUND_STATUS,
    BAD_REQUEST_STATUS,
    INTERNAL_SERVER_ERROR_STATUS,
    FORBIDDEN_STATUS
} from "@/consts/api";

const MAX_UPDATE_LIMIT = 15;
const MAX_DELETE_LIMIT = 10;

// PUT /api/posts/:postId
export async function PUT(request: NextRequest, context: { params: { postId: string } }) {
    try {
        const { postId } = context.params;

        if (!postId) {
            return new NextResponse('Not Found', { status: NOT_FOUND_STATUS });
        }

        const [post, session, oldPost]: [Post, Session | null, Post | null] = await Promise.all([
            request.json(),
            getServerSession(authOptions),
            findPost(postId)
        ])

        if (!oldPost) {
            return new NextResponse('Not Found', { status: NOT_FOUND_STATUS });
        }

        if (oldPost?.updatedBy?.email !== session?.user?.email) {
            return new NextResponse('The post can only be edited by its creator', { status: FORBIDDEN_STATUS });
        }

        const oldUpdateCount = oldPost.updateCount || 0;
        if (oldUpdateCount >= MAX_UPDATE_LIMIT) {
            return new NextResponse(`A post can only be updated ${MAX_UPDATE_LIMIT} times`, { status: FORBIDDEN_STATUS });
        }

        const errorMessage = getPostValidationError(post);
        if (errorMessage) {
            return new NextResponse(errorMessage, { status: BAD_REQUEST_STATUS });
        }

        await Promise.all([
            firestore.collection('posts').doc(postId).update({
                title: post.title,
                body: post.body,
                updatedBy: session?.user,
                updatedAt: admin.firestore.Timestamp.now(),
                updateCount: admin.firestore.FieldValue.increment(1),
                deletedAt: null,
            }),
            revalidate(request, ['/posts', `/posts/${postId}`])
        ])

        console.log('Post edited successfully')
        return NextResponse.json({ message: 'Post edited successfully' })
    } catch (error) {
        console.error('Error edting post: ', error);
        return new NextResponse('Internal Servder Error', { status: INTERNAL_SERVER_ERROR_STATUS });
    }
}

// DELETE /api/posts/:postId
export async function DELETE(request: NextRequest, context: { params: { postId: string } }) {
    const { postId } = context.params;

    if (!postId) {
        return new NextResponse('Not Found', { status: NOT_FOUND_STATUS });
    }

    const [post, session]: [Post | null, Session | null] = await Promise.all([
        findPost(postId),
        getServerSession(authOptions),
    ])

    if (!post) {
        return new NextResponse('Not Found', { status: NOT_FOUND_STATUS });
    }

    if (post?.updatedBy?.email !== session?.user?.email) {
        return new NextResponse('The post can only be deleted by its creator', { status: FORBIDDEN_STATUS });
    }

    const deletedPosts = await firestore.collection('posts')
        .where('updatedBy.email', '==', session!.user!.email)
        .where('deletedAt', '!=', null)
        .get();

    if (deletedPosts.size >= MAX_DELETE_LIMIT) {
        return new NextResponse('Delete Limit Exceeded', { status: FORBIDDEN_STATUS });
    }

    try {
        await Promise.all([
            firestore.collection('posts').doc(postId).set({
                deletedAt: admin.firestore.Timestamp.now(),
            }, { merge: true }),
            revalidate(request, ['/posts', `/posts/${postId}`]),
        ])

        console.log('Post deleted successfully');
        return NextResponse.json({ message: 'Post deleted successfully' })
    } catch (error) {
        console.error('Error deleting post: ', error);
        return new NextResponse('Internal Server Error', { status: INTERNAL_SERVER_ERROR_STATUS });
    }
}
