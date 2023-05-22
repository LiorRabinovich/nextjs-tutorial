import { NextRequest, NextResponse } from "next/server";
import admin from 'firebase-admin';
import { firestore } from '@/firebase'
import Post from '@/types/Post';
import { getPostValidationError } from '@/services/posts.server';
import revalidate from '@/services/revalidate';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "../auth/[...nextauth]/route";
import { Session } from "next-auth";
import { NOT_FOUND_STATUS } from "@/consts/api";

const MAX_CREATE_LIMIT = 10;

// POST /api/posts
export async function POST(request: NextRequest) {
    try {
        const [post, session]: [Post, Session | null] = await Promise.all([
            request.json(),
            getServerSession(authOptions)
        ])
    
        const userPosts = await firestore
            .collection('posts')
            .where('deletedAt', '==', null)
            .where('updatedBy.email', '==', session!.user!.email)
            .get();
    
        if (userPosts.size >= MAX_CREATE_LIMIT) {
            return new NextResponse('Maximum number of posts reached', { status: NOT_FOUND_STATUS });
        }
    
        const errorMessage = getPostValidationError(post);
        if (errorMessage) {
            return new NextResponse(errorMessage, { status: NOT_FOUND_STATUS });
        }

        await firestore.collection('posts').doc().set({
            ...post,
            updatedBy: session!.user,
            updatedAt: admin.firestore.Timestamp.now(),
            updateCount: 0,
            deletedAt: null,
        })

        await revalidate(request, ['/posts']);
        console.log('Post added successfully');
        return NextResponse.json({ message: 'Post added successfully' })
    } catch (error) {
        console.error('Error adding post: ', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
