'use client'
import Link from "next/link"
import { deletePost } from '@/services/posts.client';
import {useRouter} from 'next/navigation';
import RestrictedContent from '@/components/RestrictedContent';

interface PostActionsProps {
    postId: string,
}

export default function PostActions({ postId }: PostActionsProps) {
    const {push} = useRouter();

    async function onDelete() {
        await deletePost(postId);
        alert('Post deleted successfully');
        push('/posts');
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