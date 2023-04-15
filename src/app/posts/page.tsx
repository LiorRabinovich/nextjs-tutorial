// domain.co.il/posts

import Link from "next/link";

const POSTS = Array.from({length: 10});

export default function PostsPage() {
    return (
        <>
            <header className="flex items-center mb-6">
                <h1>Posts Page</h1>
                <Link href="/posts/new" className="btn ml-auto">New Post</Link>
            </header>

            <ul>
                {POSTS.map((_, index) => (
                    <li key={index}>
                        <Link href={`/posts/${index}`}>Post {index}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}