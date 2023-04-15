// domain.co.il/posts/:postId

import Link from "next/link"

interface PostView {
    params: {
        postId: string
    }
}

export default function PostViewPage(props: PostView) {
    const { postId } = props.params;
    return (
        <>
            <header className="flex items-center mb-6">
                <h1>PostView {postId} Page</h1>
                <div className="ml-auto flex gap-4">
                    <Link className="btn" href={`/posts/${postId}/edit`}>Edit</Link>
                    <button className="btn--red">Delete</button>
                </div>
            </header>
        </>
    )
}