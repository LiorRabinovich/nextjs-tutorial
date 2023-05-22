'use client'
import Link from "next/link"
import { deletePost } from '@/services/posts.client';
import RestrictedContent from '@/components/RestrictedContent';

interface PostActionsProps {
    postId: string,
}

export default function PostActions({ postId }: PostActionsProps) {
    async function onDelete() {
        try {
            await deletePost(postId);
            alert('Post deleted successfully');
            window.location.href = "/posts";
        } catch(error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <RestrictedContent>
            <div className="ml-auto flex gap-4">
                <Link className="btn" href={`/posts/${postId}/edit`}>Edit</Link>
                <button onClick={onDelete} className="btn--red">Delete</button>
            </div>
        </RestrictedContent>
    )
}