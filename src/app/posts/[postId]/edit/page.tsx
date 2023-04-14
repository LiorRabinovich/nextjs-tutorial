// domain.co.il/posts/:postId/edit
import PostForm from '@/components/PostForm';

interface PostEdit {
    params: {
        postId: string,
    }
}

export default function PostEditPage(props: PostEdit) {
    return (
        <>
            <header>
                <h1>PostEdit {props.params.postId} Page</h1>
            </header>

            <PostForm />
        </>
    )
}