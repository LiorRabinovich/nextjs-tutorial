// domain.co.il/posts

import Link from "next/link";
import PostCard from '@/components/PostCard';
import Post from '@/types/Post'
import { getPosts } from '@/services/posts.server';

export const dynamic = 'force-static';

export const metadata = {
    title: 'Posts | Next.js Tutorial',
    description: 'Posts Description | Next.js Tutorial'
}

export default async function PostsPage() {
    const posts: Post[] = await getPosts();

    return (
        <>
            <header className="flex items-center mb-6">
                <h1>Posts Page</h1>
                <Link href="/posts/new" className="btn ml-auto">New Post</Link>
            </header>

            <ul className="grid grid-cols-3 gap-3">
                {posts.map((post) => (
                    <PostCard key={post.id} {...post} />
                ))}
            </ul>
        </>
    )
}