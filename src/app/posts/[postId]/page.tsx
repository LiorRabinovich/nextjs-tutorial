// domain.co.il/posts/:postId

interface PostView {
    params: {
        postId: string
    }
}

export default function PostViewPage(props: PostView) {
    return (
        <>
            <header>
                <h1>PostView {props.params.postId} Page</h1>
            </header>
        </>
    )
}