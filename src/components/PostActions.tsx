'use client'
import Link from "next/link"
import { deletePost } from '@/services/posts';
import {useRouter} from 'next/navigation';

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
        <div className="ml-auto flex gap-4">
            <Link className="btn" href={`/posts/${postId}/edit`}>Edit</Link>
            <button onClick={onDelete} className="btn--red">Delete</button>
        </div>
    )
}